const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// categoryController.js
const createCategory = async (req, res) => {
    const { category_name } = req.body;
    
    // Adicionar log para depuração
    console.log("Categoria recebida:", category_name);

    if (!category_name) {
        return res.status(400).json({ error: "Nome da categoria é obrigatório" });
    }

    try {
        const catName = await prisma.category.create({
            data: {
                category_name,
            },
        });
        res.status(201).json(catName);
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        res.status(400).json({ error: "Erro ao criar categoria" });
    }
};


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
        const id = parseInt(req.params.category_id);
        const { category_name } = req.body;
        const categoryUpdate = await prisma.category.update({
            where: { category_id: id },
            data: {
                category_name
            },
        });
        res.status(200).json(categoryUpdate);
    }
    catch (error) {
        res.status(400).json({error: "Erro ao atualizar a categoria"});
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
const filterProducts = async (req, res) => {
    const { product_name, unit_id, supplier_id } = req.query;
    
    const filters = {};
    if (product_name) filters.product_name = { contains: product_name, mode: 'insensitive' };
    if (unit) filters.unit_type = { contains: unit, mode: 'insensitive' }; // Verificar este campo
    if (unit_id) filters.unit_id = parseInt(unit_id);
    if (supplier_id) filters.supplier_id = parseInt(supplier_id);
  
    try {
      const filteredProducts = await prisma.product.findMany({
        where: filters,
        include: { unit: true, supplier: true } // Confirme que 'unit' e 'supplier' estão configurados
      });
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error(error); // Adicione logs para o erro
      res.status(500).json({ error: "Erro ao filtrar produtos" });
    }
  };

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    filterProducts
};