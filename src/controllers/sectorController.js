const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSector = async (req, res) => {
    const { sector_name, local_id } = req.body;

    try {
        const createSec = await prisma.sector.create({
            data: {
                sector_name,
                local_id
            },
        });
        res.status(201).json(createSec);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar setor" });
    }
};

const getAllSectors = async (req, res) => {
    try {
        const getSecs = await prisma.sector.findMany();
        res.json(getSecs);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar setores." });
    }
};

const updateSector = async (req, res) => {
    try {
        const id = parseInt(req.params.sector_id);
        const { sector_name, local_id } = req.body;
        const updateSec = await prisma.sector.update({
            where: { sector_id: id },
            data: {
                sector_name,
                local_id
            },
        });
        res.status(200).json(updateSec);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar o setor" });
    }
};

const deleteSector = async (req, res) => {
    try {
        const id = parseInt(req.params.sector_id);
        const deleteSec = await prisma.sector.delete({
            where: { sector_id: id },
        });
        res.status(200).json(deleteSec);
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar o setor" });
    }
};

module.exports = {
    createSector,
    getAllSectors,
    updateSector,
    deleteSector
};
