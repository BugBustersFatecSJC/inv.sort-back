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
                quantity_max,
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
    const productId = parseInt(req.params.product_id); // ID do produto
    const quantityToBuy = parseInt(req.body.quantity); // Quantidade a comprar
    const validadeLote = req.body.validade ? new Date(req.body.validade) : null; // Converte validade para Date se houver
    const quantityMaxPerBatch = parseInt(req.body.maximo); // Quantidade máxima por lote

    try {
        // Verifica se productId é um número válido
        if (isNaN(productId)) {
            return res.status(400).json({ error: "ID do produto inválido." });
        }

        // Busca o produto pelo ID
        const product = await prisma.product.findUnique({
            where: { product_id: productId },
            select: { is_perishable: true } // Seleciona apenas a propriedade de perecibilidade
        });

        // Verifica se o produto existe
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        let remainingQuantity = quantityToBuy;

        // Lógica para preencher lotes existentes ou criar novos
        let batch = await prisma.batch.findFirst({
            where: {
                product_id: productId,
                quantity: { lt: quantityMaxPerBatch },
                ...(product.is_perishable && validadeLote ? { expiration_date: validadeLote } : {}) // Condição para produtos perecíveis
            },
            orderBy: [ { expiration_date: 'asc' },
                        { created_at: 'asc' } ]
        });

        // Processamento para adicionar ou criar lotes até que a quantidade seja esgotada
        while (remainingQuantity > 0) {
            const quantityForBatch = Math.min(remainingQuantity, quantityMaxPerBatch - (batch ? batch.quantity : 0));

            if (batch) {
                // Atualiza o lote existente com a quantidade necessária
                await prisma.batch.update({
                    where: { batch_id: batch.batch_id },
                    data: { quantity: { increment: quantityForBatch } }
                });
            } else {
                // Cria um novo lote se não há lotes disponíveis ou se condições exigem um novo lote
                batch = await prisma.batch.create({
                    data: {
                        product_id: productId,
                        quantity: quantityForBatch,
                        expiration_date: product.is_perishable ? validadeLote : null, // Apenas produtos perecíveis têm validade
                        quantity_max: quantityMaxPerBatch
                    }
                });
            }

            remainingQuantity -= quantityForBatch;

            if (remainingQuantity > 0) {
                batch = await prisma.batch.findFirst({
                    where: {
                        product_id: productId,
                        quantity: { lt: quantityMaxPerBatch },
                        ...(product.is_perishable && validadeLote ? { expiration_date: validadeLote } : {})
                    },
                    orderBy: [ { expiration_date: 'asc' },
                        { created_at: 'asc' } ]
                });
            }
        }

        return res.status(201).json({ message: "Lotes criados e atualizados com sucesso." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar ou atualizar os lotes." });
    }
};



const sellBatchByProductId = async (req, res) => {
    const productId = parseInt(req.params.product_id); // ID do produto
    const quantityToSubtract = parseInt(Math.abs(req.body.quantity)); // Quantidade a ser subtraída
    let alertaEstoque = false; // Variável de alerta de estoque baixo

    try {
        // Encontrar o lote mais antigo para o produto especificado
        const batch = await prisma.batch.findFirst({
            where: { product_id: productId },
            include: {
                product: { // Inclui as informações do produto
                    select: {
                        product_stock_min: true, // Seleciona o estoque mínimo
                    }
                }
            },
            orderBy: [
                { expiration_date: 'asc' }, // Ordena pela data de expiração
                { created_at: 'asc' }       // Em caso de empate, ordena pela data de criação
            ]
        });
        
        // Verificar se o lote existe
        if (!batch) {
            return res.status(404).json({ error: "Nenhum lote encontrado para este produto." });
        }

        // Verificar se o produto está definido
        if (!batch.product) {
            return res.status(404).json({ error: "Produto associado ao lote não encontrado." });
        }

        const newQuantity = batch.quantity - quantityToSubtract;

        // Verificar se a nova quantidade é negativa
        if (newQuantity < 0) {
            return res.status(400).json({ error: "Quantidade não pode ser negativa." });
        }

        // Novo passo: Apagar o lote se a quantidade for zero
        if (newQuantity == 0) {
            await prisma.batch.delete({
                where: { batch_id: batch.batch_id }
            });
            return res.status(200).json({ message: "Lote esvaziado e removido com sucesso." });
        }

        // Verificar o estoque mínimo do produto
        if (batch.product.product_stock_min !== null && newQuantity < batch.product.product_stock_min) {
            alertaEstoque = true; // Aciona o alerta de estoque
        }

        // Atualizar o lote no banco de dados com a nova quantidade
        const updatedBatch = await prisma.batch.update({
            where: { batch_id: batch.batch_id }, // Usar o batch_id do lote encontrado
            data: { quantity: newQuantity },
        });
        
        // Enviar a resposta com o lote atualizado e o alerta de estoque
        return res.status(200).json({ updatedBatch, alertaEstoque });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao subtrair a quantidade do lote." });
    }
};




module.exports = {
    createBatch,
    getAllBatches,
    updateBatch,
    deleteBatch,
    sellBatch,
    getBatchesByProductId,
    sellBatchByProductId,
    buyBatchByProductId
};
