const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cria um novo lote
const createBatch = async (req, res) => {
    const { product_id, quantity, quantity_max, expiration_date, manufacture_date, batch_value_total } = req.body;
    const quantityInt = Number(quantity)


    try {
        const createBat = await prisma.batch.create({
            data: {
                product_id,
                quantity:quantityInt,
                quantity_max,
                expiration_date,
                manufacture_date,
                batch_value_total
            },
        });
        res.status(201).json(createBat);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Erro ao criar lote" });
    }
};

// Obtém todos os lotes
const getAllBatches = async (req, res) => {
    try {
        const getBatches = await prisma.batch.findMany({
            include: {
                product: true, // Inclui informações do produto relacionado
            }
        });
        res.json(getBatches);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar lotes." });
    }
};

// Atualiza um lote existente
const updateBatch = async (req, res) => {
    const id = parseInt(req.params.batch_id); // Obtém o ID do lote a ser atualizado
    const { product_id, quantity, quantity_max, expiration_date, manufacture_date, batch_value_total } = req.body;

    try {
        const updateBat = await prisma.batch.update({
            where: { batch_id: id },
            data: {
                product_id,
                quantity,
                expiration_date,
                manufacture_date,
                batch_value_total
            },
        });
        res.status(200).json(updateBat);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar o lote" });
    }
};

// Deleta um lote existente
const deleteBatch = async (req, res) => {
    const id = parseInt(req.params.batch_id); // Obtém o ID do lote a ser deletado

    try {
        const deleteBat = await prisma.batch.delete({
            where: { batch_id: id },
        });
        return res.status(200).json(deleteBat);
    } catch (error) {
        return res.status(400).json({ error: "Erro ao deletar o lote" });
    }
};

const getBatchesByProductId = async (req, res) => {
    const productId = parseInt(req.params.product_id);
    try {
        const batch = await prisma.batch.findFirst({
            where: { product_id: productId },
            orderBy: [
                { expiration_date: 'asc' }, // Ordena pela data de expiração
                { created_at: 'asc' }       // Em caso de empate, ordena pela data de criação
            ]
        });
        
        if (!batch) {
            return res.status(404).json({ error: "Nenhum lote encontrado para este produto." });
        }

        return res.status(200).json(batch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar lote." });
    }
};



const sellBatch = async (req, res) => { //Controler usado para compra e venda
    const batchId = parseInt(req.params.batch_id); // ID do lote
    const x = parseInt(req.body.quantity); // Valor a ser subtraído
    let alertaEstoque = false; // Declarar a variável de alerta de esoque baixo

    try {
        // Encontramos o lote (Batch) com base no batch_id, incluindo o estoque mínimo do produto
        const batch = await prisma.batch.findUnique({
            where: { batch_id: batchId },
            select: {
                quantity: true,
                product: { // Relacionamento com a tabela Product
                    select: {
                        product_stock_min: true, // Seleciona o estoque mínimo da tabela Product
                    }
                }
            },
        });
        
        // Verificamos se o lote existe
        if (!batch) {
            return res.status(404).json({ error: `Lote com ID ${batchId} não encontrado.` });
        }
        const newQuantity = batch.quantity - x;
        
    
        if (batch.product.product_stock_min !== null && newQuantity < batch.product.product_stock_min) {
            alertaEstoque = true; // Aciona o alerta de estoque
        }
        
        if (newQuantity < 0) {
            return res.status(400).json({ error: "Quantidade não pode ser negativa." });
        }
        
        // Atualizamos o lote no banco de dados com a nova quantidade
        
        const updatedBatch = await prisma.batch.update({
            where: { batch_id: batchId },
            data: { quantity: newQuantity },
        });
        
        // Enviamos o lote atualizado como resposta
        return res.status(200).json({ updatedBatch, alertaEstoque });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao subtrair a quantidade do lote." });
    }
};

const buyBatchByProductId = async (req, res) => {
    console.log(req.body);
    
    const productId = parseInt(req.params.product_id); // ID do produto
    const quantityToBuy = parseInt(req.body.quantity); // Quantidade a comprar
    const validadeLote = req.body.validade ? new Date(req.body.validade) : null; // Converte validade para Date se houver
    const stock = await prisma.product.findUnique({
        where: { product_id: productId },
        select: { product_stock: true }
    });
    const newStock = stock.product_stock + quantityToBuy;
    let alertaEstoque = false; // Variável de alerta de estoque baixo
    if (newStock < 0) {
        return res.status(400).json({ error: "Quantidade não pode ser negativa." });
    }

    try{
        const product = await prisma.product.update({
           where: { product_id: productId },
              data: { product_stock: { increment: quantityToBuy } }

        });
        const result = await prisma.stockMovement.create({
            data: {
                product_id: productId,
                quantity: quantityToBuy,
                movement_type: 'Venda',
            }
        });

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao adicionar a quantidade ao produto." });
    }
};



const sellBatchByProductId = async (req, res) => { //Principal Rota de Venda
    const productId = parseInt(req.params.product_id); // ID do produto
    const quantityToSubtract = parseInt(Math.abs(req.body.quantity)); // Quantidade a ser subtraída
    let alertaEstoque = false; // Variável de alerta de estoque baixo
    const stock = await prisma.product.findUnique({
        where: { product_id: productId },
        select: { product_stock: true }
    });
    const newStock = stock.product_stock - quantityToSubtract;
    if (newStock < 0) {
        return res.status(400).json({ error: "Quantidade não pode ser negativa." });
    }
    
    try {
        try{
            const product = await prisma.product.update({
               where: { product_id: productId },
                  data: { product_stock: { decrement: quantityToSubtract } }
    
            });
            const result = await prisma.stockMovement.create({
                data: {
                    product_id: productId,
                    quantity: quantityToSubtract,
                    movement_type: 'Venda',
                }
            });
    
        }
    
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao adicionar a quantidade ao produto." });
        }

    }

   
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao adicionar a quantidade ao produto." });
    }

};



const checkExpiringBatches = async (req, res) => {
    try {
        const currentDate = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(currentDate.getDate() + 7);

        const expiringBatches = await prisma.batch.findMany({
            where: {
                expiration_date: {
                    lte: oneWeekFromNow,
                    gte: currentDate
                }
            },
            include: {
                product: true,
            }
        });

        if (expiringBatches.length > 0) {
            expiringBatches.forEach(batch => {
                console.log(`Notificação: O lote ${batch.batch_id} do produto ${batch.product.product_name} está próximo da data de validade!`);
            });

            res.status(200).json({
                message: "Lotes próximos da validade:",
                lotes: expiringBatches
            });
        } else {
            res.status(200).json({
                message: "Nenhum lote próximo da validade foi encontrado."
            });
        }
    } catch (error) {
        console.error("Erro ao verificar lotes próximos da validade:", error);
        res.status(500).json({ error: "Erro ao verificar lotes próximos da validade." });
    }
};

module.exports = {
    createBatch,
    getAllBatches,
    updateBatch,
    deleteBatch,
    sellBatch,
    checkExpiringBatches,
    getBatchesByProductId,
    sellBatchByProductId,
    buyBatchByProductId
};
