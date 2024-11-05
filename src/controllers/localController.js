const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createLocal = async (req, res) => {
    console.log('createLocal foi chamado');
    const { local_name, local_address } = req.body;
    console.log('Dados recebidos para criar local:', { local_name, local_address });

    try {
        const existingLocal = await prisma.local.findUnique({
            where: { local_name }
        });

        if (existingLocal) {
            return res.status(400).json({ error: "Local com este nome já existe." });
        }

        const createLoc = await prisma.local.create({
            data: {
                local_name,
                local_address
            },
        });
        res.status(201).json(createLoc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao criar local" });
    }
};

const getAllLocals = async (req, res) => {
    try {
        const getLocs = await prisma.local.findMany();
        res.json(getLocs);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar locais." });
    }
};

const updateLocal = async (req, res) => {
    try {
        const id = parseInt(req.params.local_id);
        const { local_name, local_address } = req.body;
        const updateLoc = await prisma.local.update({
            where: { local_id: id },
            data: {
                local_name,
                local_address
            },
        });
        res.status(200).json(updateLoc);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar o local" });
    }
};

const deleteLocal = async (req, res) => {
    console.log('deleteLocal foi chamado');
    try {
        const id = parseInt(req.params.local_id);
        const deleteLoc = await prisma.local.delete({
            where: { local_id: id },
        });
        res.status(200).json(deleteLoc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar o local" });
    }
};

module.exports = {
    createLocal,
    getAllLocals,
    updateLocal,
    deleteLocal
}
