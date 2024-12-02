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
        product_stock,
        product_stock_min,
        quantity_max, 
        prod_brand, 
        prod_model, 
        supplier_id, 
        unit_id, 
        is_perishable, 
        prod_cost_value, 
        prod_sell_value 
    } = req.body;

    const productImage = req.file ? `/uploads/${req.file.filename}` : null;
    
    const categoryIdInt = Number(category_id);
    const supplierIdInt = Number(supplier_id);
    const unitIdInt = Number(unit_id);
    const isPerishableBool = Boolean(is_perishable);
    const costNumber = Number(prod_cost_value);
    const sellNumber = Number(prod_sell_value);
    const productStockInt = Number(product_stock)
    const productStockMinInt = Number(product_stock_min)
    const quantityMaxInt = Number(quantity_max)

    try {
        const newProduct = await prisma.product.create({
            data: {
                product_stock: productStockInt,    
                product_stock_min: productStockMinInt, 
                quantity_max: quantityMaxInt, 
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

        const { 
            product_name, 
            description, 
            category_id, 
            supplier_id, 
            is_perishable, 
            unit_id, 
            prod_brand, 
            prod_model, 
            prod_cost_value, 
            prod_sell_value, 
            product_stock,    
            product_stock_min,
            quantity_max 
        } = req.body;

        const intCategoryId = Number(category_id);
        const intSupplierId = Number(supplier_id);
        const boolIsPerishable = Boolean(is_perishable);
        const intUnitId = Number(unit_id);
        const costNumber = Number(prod_cost_value);
        const sellNumber = Number(prod_sell_value);
        const productStockInt = Number(product_stock);
        const productStockMinInt = Number(product_stock_min);
        const quantityMaxInt = Number(quantity_max);

        const productImage = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedProduct = await prisma.product.update({
            where: { product_id: id },
            data: {
                product_name,
                description,
                category_id: intCategoryId,
                supplier_id: intSupplierId,
                is_perishable: boolIsPerishable,
                unit_id: intUnitId,
                prod_brand,
                prod_model,
                prod_cost_value: costNumber,
                prod_sell_value: sellNumber,
                product_stock: productStockInt,    
                product_stock_min: productStockMinInt,
                quantity_max: quantityMaxInt,
                ...(productImage && { product_img: productImage })
            },
            select: {
                product_id: true, 
                product_name: true,
                description: true,
                product_stock: true,    
                product_stock_min: true,
                quantity_max: true,
                prod_brand: true,
                prod_model: true,
                prod_cost_value: true,
                prod_sell_value: true,
                product_img: true,
                category_id: true,
                supplier_id: true,
                is_perishable: true,
                unit_id: true,
            }
        })

        res.status(200).json(updatedProduct)

    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Erro ao atualizar produto" })
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

const getProductsByCategory = async (req, res) => {
    const { category_id } = req.params;
  
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
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos por categoria" });
    }
}

const checkStockLevels = async (req, res) => {
    try {
        const productsWithLowStock = await prisma.$queryRaw`
            SELECT product_id, product_name, product_stock, product_stock_min
            FROM Product
            WHERE product_stock <= product_stock_min + (product_stock_min * 0.20)
        `;

        if (productsWithLowStock.length > 0) {
            productsWithLowStock.forEach(product => {
                console.log(`Notificação: Produto ${product.product_name} está com estoque baixo!`);
            });

            res.status(200).json({
                message: "Produtos com estoque baixo",
                produtos: productsWithLowStock
            });
        } else {
            res.status(200).json({
                message: "Nenhum produto com estoque baixo foi encontrado."
            });
        }
    } catch (error) {
        console.error("Erro ao verificar níveis de estoque:", error);
        res.status(500).json({ error: "Erro ao verificar níveis de estoque." });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsbyId,  
    getAllBatches,
    getProductsByCategory,
    checkStockLevels
};
