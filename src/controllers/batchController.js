const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cria um novo lote
const createBatch = async (req, res) => {
    const { product_id, quantity, expiration_date, manufacture_date, batch_value_total } = req.body;
    const quantityInt = Number(quantity)


    try {
        const createBat = await prisma.batch.create({
            data: {
                product_id,
                quantity:quantityInt,
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
    const { product_id, quantity, expiration_date, manufacture_date, batch_value_total } = req.body;

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
        res.status(200).json(deleteBat);
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar o lote" });
    }
};

module.exports = {
    createBatch,
    getAllBatches,
    updateBatch,
    deleteBatch
};
