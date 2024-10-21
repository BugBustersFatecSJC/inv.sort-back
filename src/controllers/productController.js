const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const prod = await prisma.product.findMany({
            include: {
                category: true,
                supplier: true,
                productUnit: true
            }
        });
        res.json(prod);
    } catch (error) {
        console.log(error)
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
                productUnit: true
            }
        })
        res.status(201).json(findProduct)
    }
    catch (error) {
        res.status(400).json({error: "Falha ao identificar produto por id"})
    }
}

const createProduct = async (req, res, next) => {
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

    const productImage = req.file ? `/uploads/${req.file.filename}` : null
    
    const categoryIdInt = Number(category_id)
    const supplierIdInt = Number(supplier_id)
    const unitIdInt = Number(unit_id)
    const isPerishableBool = Boolean(is_perishable)
    const costNumber = Number(prod_cost_value)
    const sellNumber = Number(prod_sell_value)
    try {
        const newProduct = await prisma.product.create({
            data: {
                product_name,
                description,
                product_img,
                category_id: categoryIdInt,
                prod_brand,
                prod_model,
                supplier_id: supplierIdInt,
                unit_id: unitIdInt,
                is_perishable: isPerishableBool,
                prod_cost_value: costNumber,
                prod_sell_value: sellNumber,
                product_img: productImage
            },
            include: {
                category: true,   
                supplier: true,    
                productUnit: true,        
                batches: true,     
            }
        });
      
        req.body.product_id = newProduct.product_id;
        next();
        res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro ao criar produto" });       
    }
};

const updateProduct = async (req, res) => {
    try {
        console.log(req.body);
        const id = parseInt(req.params.product_id);
        const { product_name, description, category_id, supplier_id, is_perishable, unit_id, created_at } = req.body;

        // Atualizar o produto
        const updatedProduct = await prisma.product.update({
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
            select: {
                product_id: true, // Garantindo que o product_id seja retornado
                product_name: true,
                description: true,
                category_id: true,
                supplier_id: true,
                is_perishable: true,
                unit_id: true,
                created_at: true
            }
        });

        // Retornar o produto atualizado, incluindo o product_id
        res.status(200).json(updatedProduct);

        // Se quiser, você pode também modificar o req.body para incluir o product_id
        req.body.product_id = updatedProduct.product_id;

    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(400).json({ error: "Erro ao atualizar produto" });
    }
};


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
          productUnit: true,
        },
      })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos por categoria" })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsbyId,  
    getAllBatches,
    getProductsByCategory
};
