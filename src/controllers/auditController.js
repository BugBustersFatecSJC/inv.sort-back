const { PrismaClient } = require('@prisma/client');
const { Cookie } = require('express-session');
const prisma = new PrismaClient();

const auditLogMiddleware = async (req, res, next) => {
    try {
        let action;
        let productToDelete;

        // Definir a ação baseada no método HTTP
        if (req.method === 'POST') {
            action = 'INSERT';
        } else if (req.method === 'PUT') {
            action = 'UPDATE';
        } else if (req.method === 'DELETE') {
            action = 'DELETE';
            // Buscar informações do produto antes de deletar
            const productId = parseInt(req.params.product_id);
            productToDelete = await prisma.product.findUnique({
                where: { product_id: productId },
            });

            if (!productToDelete) {
                console.error(`Produto com ID ${productId} não encontrado para exclusão.`);
                return next();
            }
        }

        res.on('finish', async () => {
            try {
                if (res.statusCode === 200 || res.statusCode === 201) {
                    let product;
                    if (action === 'DELETE') {
                        product = productToDelete; 
                    } else {
                        console.log(req.body)
                        product = req.body; 
                    }

                    const primaryKeyValue = product.product_id;
                    const userId = parseInt(req.headers['x-user-id']);

                    if (!userId) {
                        console.error("User ID is undefined. Cannot create audit log.");
                        return; // Se não houver userId, não crie o log
                    }

                    // Buscar nomes da categoria e fornecedor, se não for DELETE
                    const category = product.category_id ? await prisma.category.findUnique({
                        where: { category_id: product.category_id },
                        select: { category_name: true }
                    }) : null;

                    const supplier = product.supplier_id ? await prisma.supplier.findUnique({
                        where: { supplier_id: product.supplier_id },
                        select: { supplier_name: true }
                    }) : null;

                    // Criar o log de auditoria
                    await prisma.auditLog.create({
                        data: {
                            action: action,
                            table_name: 'product',
                            primary_key_value: String(primaryKeyValue),
                            product_name: product.product_name || null,
                            category_name: category?.category_name || null,
                            supplier_name: supplier?.supplier_name || null,
                            user: {
                                connect: {
                                    user_id: userId 
                                }
                            },
                            // No caso de DELETE, não tentar conectar o produto, pois ele foi removido
                            product: action !== 'DELETE' && product.product_id ? { connect: { product_id: product.product_id } } : undefined,
                            category: product.category_id ? { connect: { category_id: product.category_id } } : undefined,
                            supplier: product.supplier_id ? { connect: { supplier_id: product.supplier_id } } : undefined,
                            unit: product.unit_id ? { connect: { unit_id: product.unit_id } } : undefined
                        }
                    });
                }
            } catch (error) {
                console.error("Erro ao criar log de auditoria", error);
            }
        });

        next();
    } catch (error) {
        console.error("Erro ao criar log de auditoria", error);
        next();
    }
};

module.exports = auditLogMiddleware;