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
        res.status(200).json(deleteBat);
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar o lote" });
    }
};

const sellBatch = async (req, res) => {
    const batchId = parseInt(req.params.batch_id); // ID do lote
    const x = parseInt(req.body.quantity); // Valor a ser subtraído (enviado no corpo da requisição)
    try {
      // Encontramos o lote (Batch) com base no batch_id
      const batch = await prisma.Batch.findUnique({
        where: { batch_id: batchId },
      });
      // Verificamos se o lote existe
      if (!batch) {
        return res.status(404).json({ error: `Lote com ID ${batchId} não encontrado.` });
      }
      // Calculamos o novo valor de quantity
      const newQuantity = batch.quantity - x;
      // Verificamos se a quantidade resultante seria negativa
      if (newQuantity < 0) {
        return res.status(400).json({ error: "Quantidade não pode ser negativa." });
      }
      // Atualizamos o lote no banco de dados com a nova quantidade
      const updatedBatch = await prisma.batch.update({
        where: { batch_id: batchId },
        data: { quantity: newQuantity },
      });
      // Enviamos o lote atualizado como resposta
      return res.status(200).json(updatedBatch);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao subtrair a quantidade do lote." });
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
    checkExpiringBatches
};
