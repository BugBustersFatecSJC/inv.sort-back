const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const prod = await prisma.product.findMany({
            include: {
                category: true,
                supplier: true,
                unit: true
            }
        });
        res.json(prod);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos. "});
    }
}

const getProductsbyId = async (req, res) => {
    try{
        const id = parseInt(req.params.product_id)
        const findProduct = await prisma.product.findUnique({
            where: {
                product_id: id
            },
            include: {
                category: true,
                supplier: true,
                unit: true
            }
        })
        res.status(201).json(findProduct)
    }
    catch (error) {
        res.status(400).json({error: "Falha ao identificar produto por id"})
    }
}

const createProduct = async (req, res) => {
    const { product_name, description, category_id, supplier_id, is_perishable, unit_id } = req.body;

    try {
        const createProd = await prisma.product.create({
            data: {
                product_name,
                description,
                category_id,
                supplier_id,
                is_perishable,
                unit_id
            },
            include: {
                category: true,
                supplier: true,
                unit: true
            }
        });
        res.status(201).json(createProd);
    } catch (error) {
        res.status(400).json({error: "Erro ao criar produto"});
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.product_id);
        const { product_name, description, category_id, supplier_id, is_perishable, unit_id, created_at } = req.body;
        const updateProd = await prisma.product.update({
            where: { product_id: id },
            data: {
                product_name,
                description,
                category_id,
                supplier_id,
                is_perishable,
                unit_id,
                created_at
            },
        });
        res.status(200).json(updateProd);
    }
    catch (error) {
        res.status(400).json({error: "Erro ao atualizar produto"});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.product_id)
        const deleteProd = await prisma.product.delete({
            where: {product_id: id},
        })
        res.status(200).json(deleteProd)
    }
    catch (error) {
        res.status(400).json({error: "Erro ao deletar produto"})
    }
}

const getProductsByCategory = async (req, res) => {
    const { category_id } = req.params
  
    try {
      const products = await prisma.product.findMany({
        where: {
          category_id: parseInt(category_id),
        },
        include: {
          category: true,
          supplier: true,
          unit: true,
        },
      })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos por categoria" })
    }
}

const filterProducts = async (req, res) => {
    try {
        const { product_name, unit, unit_id, supplier_id } = req.query;

        const filters = {};
        if (product_name) {
            filters.product_name = { contains: product_name, mode: 'insensitive' };
        }
        if (unit_id) {
            filters.unit_id = parseInt(unit_id);
        }
        if (supplier_id) {
            filters.supplier_id = parseInt(supplier_id);
        }
        if (unit) {
            filters.unit = {
                unit_type: { contains: unit, mode: 'insensitive' }
            };
        }

        const filteredProducts = await prisma.product.findMany({
            where: filters,
            include: {
                unit: true,
                supplier: true,
                // other relations if needed
            }
        });

        res.status(200).json(filteredProducts);

    } catch (error) {
        res.status(500).json({ error: "Erro ao filtrar produtos" });
    }
};


module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsbyId,
    getProductsByCategory,
    filterProducts, 
};