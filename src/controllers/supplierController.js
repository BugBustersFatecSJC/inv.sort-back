const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSupplier = async (req, res) => {
    const { supplier_name, contact_info, address } = req.body;

    try {
        const createSup = await prisma.supplier.create({
            data: {
                supplier_name,
                contact_info,
                address
            },
        });
        res.status(201).json(createSup);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const getSup = await prisma.supplier.findMany();
        res.json(getSup);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar supplier. "});
    }
}

const updateSupplier = async (req, res) => {
    try {
        const id = parseInt(req.params.supplier_id);
        const { supplier_name, contact_info, address } = req.body;
        const updateSup = await prisma.supplier.update({
            where: { supplier_id: id },
            data: {
                supplier_name,
                contact_info,
                address
            },
        });
        res.status(200).json(updateSup);
    }
    catch (error) {
        res.status(400).json({error: "Erro ao atualizar o supplier"});
    }
}
const deleteSupplier = async (req, res) => {
    try {
        const id = parseInt(req.params.supplier_id)
        const deleteSup = await prisma.supplier.delete({
            where: {supplier_id: id},
        })
        res.status(200).json(deleteSup)
    }
    catch (error) {
        res.status(400).json({error: "Erro ao deletar o supplier"})
    }
}

module.exports = {
    createSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier
};