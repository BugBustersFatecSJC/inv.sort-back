const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllStockMovements = async (req, res) => {
  try {
    const stockMovements = await prisma.stockMovement.findMany({
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
