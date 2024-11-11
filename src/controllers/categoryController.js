const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    const { category_name } = req.body
    const categoryImage = req.file ? `/uploads/${req.file.filename}` : null

    try {
        console.log(req.headers)

        const category = await prisma.category.create({
            data: {
                category_name: category_name,
                category_image: categoryImage
            },
        })
        res.status(201).json(category)
    } catch (error) {
        console.error(error)
        res.status(400).json({ error })
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

const filterCategories = async (req, res) => {
    const { quantity, localId, createdDate, orderByQuantity } = req.query;

    try {
        const filters = {};

        if (localId) {
            filters.local_id = parseInt(localId);
        }

        if (createdDate) {
            filters.created_at = new Date(createdDate);
        }

        const filteredCategories = await prisma.category.findMany({
            where: filters,
            include: {
                products: true
            }
        });

        let categoriesWithProductCount = filteredCategories.filter(category => {
            const productCount = category.products.length;
            return quantity ? productCount >= parseInt(quantity) : true;
        });

        if (orderByQuantity === 'asc' || orderByQuantity === 'desc') {
            categoriesWithProductCount = categoriesWithProductCount.sort((a, b) => {
                return orderByQuantity === 'asc' ? a.products.length - b.products.length : b.products.length - a.products.length;
            });
        }

        return res.status(200).json(categoriesWithProductCount);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Erro ao filtrar categorias." });
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
                category_image: categoryImage
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
    deleteCategory,
    filterCategories
};