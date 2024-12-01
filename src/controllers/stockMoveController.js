const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PDFDocument = require('pdfkit');

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

  const downloadStockMovementsPDF = async (req, res) => {
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
          product: { select: { product_name: true } },
          user: { select: { username: true } },
          batch: { select: { batch_id: true } },
          category: { select: { category_name: true } },
        },
      });

      if (!stockMovements.length) {
        return res.status(404).send("Nenhuma movimentação encontrada.");
      }

      // Cria um novo documento PDF
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=stock_movements.pdf');

      doc.pipe(res);

      // Título
      doc.fontSize(18).text('Movimentações de Estoque', { align: 'center' });
      doc.moveDown();

      // Dados
      stockMovements.forEach((movement, index) => {
        doc.fontSize(12).text(`Movimentação ${index + 1}`);
        doc.fontSize(10).text(`Produto: ${movement.product?.product_name || 'N/A'}`);
        doc.text(`Quantidade: ${movement.quantity}`);
        doc.text(`Lote: ${movement.batch?.batch_id || 'N/A'}`);
        doc.text(`Tipo de Movimentação: ${movement.movement_type}`);
        doc.text(`Usuário: ${movement.user?.username || 'N/A'}`);
        doc.text(`Data da Movimentação: ${new Date(movement.movement_date).toLocaleDateString()}`);
        doc.text(`Categoria: ${movement.category?.category_name || 'N/A'}`);
        doc.moveDown();
      });

      // Finaliza o documento
      doc.end();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return res.status(500).json({ error: 'Erro ao gerar o PDF' });
    }
  };



module.exports = {
  getAllStockMovements,
  downloadStockMovementsPDF,
};
