const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const prod = await prisma.product.findMany({
            include: {
                category: true,
                supplier: true,
                unit: true,
                batches: true,     
                local: true,
                sector: true
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
                unit: true,
                
            }
        })
        res.status(201).json(findProduct)
    }
    catch (error) {
        res.status(400).json({error: "Falha ao identificar produto por id"})
    }
}

const createProduct = async (req, res) => {
    const { 
        product_name, 
        description, 
        product_img, 
        category_id, 
        prod_brand, 
        prod_model, 
        supplier_id, 
        unit_id, 
        is_perishable, 
        prod_cost_value, 
        prod_sell_value 
    } = req.body;

    try {
        const newProduct = await prisma.product.create({
            data: {
                product_name,
                description,
                product_img,
                category_id,
                prod_brand,
                prod_model,
                supplier_id,
                unit_id,
                is_perishable,
                prod_cost_value,
                prod_sell_value
            },
            include: {
                category: true,   
                supplier: true,    
                productUnit: true,        
                batches: true,     
               

            }
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao criar produto" });
    }
};

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



// Método para obter todos os lotes
const getAllBatches = async (req, res) => {
    try {
        const batches = await prisma.batch.findMany();
        res.json(batches);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar lotes." });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsbyId,  
    getAllBatches,
};