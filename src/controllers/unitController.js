const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const setUnit = async (req, res) => {
    const { unit_type } = req.body;

    try {
        const createUn = await prisma.productUnit.create({
            data: {
                unit_type
            },
        });
        res.status(201).json(createUn);
    } catch (error) {
        res.status(400).json({error: "Erro ao criar tipo de unidade"});
    }
};

const getAllUnits = async (req, res) => {
    try {
        const getUnit = await prisma.productUnit.findMany();
        res.json(getUnit);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar a unit. "});
    }
}

const updateUnit = async (req, res) => {
    try {
        const id = parseInt(req.params.unit_id);
        const { unit_type } = req.body;
        const unitUpdate = await prisma.productUnit.update({
            where: { unit_id: id },
            data: {
                unit_type
            },
        });
        res.status(200).json(unitUpdate);
    }
    catch (error) {
        res.status(400).json({error: "Erro ao atualizar o unit"});
    }
}
const deleteUnit = async (req, res) => {
    try {
        const id = parseInt(req.params.unit_id)
        const unitDelete = await prisma.productUnit.delete({
            where: {unit_id: id},
        })
        res.status(200).json(unitDelete)
    }
    catch (error) {
        res.status(400).json({error: "Erro ao deletar o unit"})
    }
}

module.exports = {
    setUnit,
    getAllUnits,
    updateUnit,
    deleteUnit
};