const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    const { category_name } = req.body
    const categoryImage = req.file ? `/uploads/${req.file.filename}` : null

    try {
        const category = await prisma.category.create({
            data: {
                category_name,
                category_image: categoryImage
            },
        })
        res.status(201).json(category)
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Erro ao criar categoria" })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const getCat = await prisma.category.findMany();
        res.json(getCat);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar categoria. "});
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.category_id)
        const { category_name } = req.body
        const categoryImage = req.file ? `/uploads/${req.file.filename}` : null

        const updatedCategory = await prisma.category.update({
            where: { category_id: id },
            data: {
                category_name,
                category_image: categoryImage || undefined
            },
        })
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Erro ao atualizar a categoria" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.category_id)
        const categoryDelete = await prisma.category.delete({
            where: {category_id: id},
        })
        res.status(200).json(categoryDelete)
    }
    catch (error) {
        res.status(400).json({error: "Erro ao deletar a categoria"})
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};