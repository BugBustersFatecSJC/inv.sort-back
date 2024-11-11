const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllStockMovements = async (req, res) => {
  try {
    const { productName, username, movementType, movementDate, categoryId } = req.query;
    
    const filters = {};
    if (productName) filters.product_name = { contains: productName, mode: 'insensitive' };
    if (username) filters.user = { username: { contains: username, mode: 'insensitive' } };
    if (movementType) filters.movement_type = movementType;
    if (movementDate) filters.movement_date = { equals: new Date(movementDate) };
    if (categoryId) filters.category_id = parseInt(categoryId);

    const stockMovements = await prisma.stockMovement.findMany({
      where: filters,
      include: {
        product: {
          select: {
            product_name: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
        batch: {
          select: {
            batch_id: true,
          },
        },
        category: { 
          select: {
            category_name: true,
          },
        },
      },
    });

    return res.json(stockMovements);
  } catch (error) {
    console.error('Erro ao buscar movimentações de estoque:', error);
    return res.status(500).json({ error: 'Erro ao buscar movimentações de estoque' });
  }
};


module.exports = {
  getAllStockMovements,
};
