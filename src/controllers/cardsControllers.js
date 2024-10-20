const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cardYear = async (req, res) => {
    await prisma.$connect();
   
    const data = new Date();
    const dia = data.getDate();
    let mes = data.getMonth() ; // Corrigindo para que o mês comece de 1
    const ano = data.getFullYear();
    const result = [];

    // Query para obter a categoria com maior venda no mês atual
    const catVenda = await prisma.$queryRaw`
      SELECT category.category_name
      FROM StockMovement AS sm
      JOIN Product AS p ON sm.product_id = p.product_id
      JOIN Category AS category ON p.category_id = category.category_id
      WHERE sm.movement_type = 'venda'
        AND MONTH(sm.movement_date) = ${mes}
      GROUP BY category.category_name
      ORDER BY SUM(sm.quantity) DESC
      LIMIT 1;
    `;

    // Query para obter o produto com maior venda no mês atual
    const prodVenda = await prisma.$queryRaw`
      SELECT p.product_name
      FROM StockMovement AS sm
      JOIN Product AS p ON sm.product_id = p.product_id
      WHERE sm.movement_type = 'venda'
        AND MONTH(sm.movement_date) = ${mes}
      GROUP BY p.product_name
      ORDER BY SUM(sm.quantity) DESC
      LIMIT 1;
    `;

    result.push(catVenda);
    result.push(prodVenda);
  
    const month1 = mes-1; // Substitua pelo primeiro mês (e.g., Janeiro)
    const month2 = mes; // Substitua pelo segundo mês (e.g., Fevereiro)
  
    // Query para obter o produto com a maior diferença de vendas entre os meses especificados
    const prodDesempenho = await prisma.$queryRaw`
    SELECT p.product_name, differences.difference AS max_difference
    FROM (
      SELECT sm.product_id, 
             ABS(SUM(CASE WHEN MONTH(sm.movement_date) = ${month1} THEN sm.quantity ELSE 0 END) -
                 SUM(CASE WHEN MONTH(sm.movement_date) = ${month2} THEN sm.quantity ELSE 0 END)) AS difference
      FROM StockMovement AS sm
      WHERE sm.movement_type = 'venda'
        AND (MONTH(sm.movement_date) = ${month1} OR MONTH(sm.movement_date) = ${month2})
      GROUP BY sm.product_id
    ) AS differences
    JOIN Product AS p ON differences.product_id = p.product_id
    ORDER BY differences.difference DESC
    LIMIT 1; `;
    // Query para obter o Categoria com a maior diferença de vendas entre os meses especificados
    const catDesempenho = await prisma.$queryRaw`
    SELECT c.category_name, MAX(difference) AS max_difference
    FROM (
        SELECT p.category_id,
               ABS(SUM(CASE WHEN MONTH(sm.movement_date) = ${month1} THEN sm.quantity ELSE 0 END) -
                   SUM(CASE WHEN MONTH(sm.movement_date) = ${month2} THEN sm.quantity ELSE 0 END)) AS difference
        FROM StockMovement AS sm
        JOIN Product AS p ON sm.product_id = p.product_id
        WHERE sm.movement_type = 'venda'
          AND (MONTH(sm.movement_date) = ${month1} OR MONTH(sm.movement_date) = ${month2})
        GROUP BY p.category_id
    ) AS differences
    JOIN Category AS c ON differences.category_id = c.category_id
    GROUP BY c.category_name
    ORDER BY max_difference DESC
    LIMIT 1;
  `;
    console.log(`Categoria com a maior venda no mês ${mes}:`, catVenda);
    console.log(`Produto com a maior venda no mês ${mes}:`, prodVenda);
    console.log(`Produto com a maior diferença entre os meses ${month1} e ${month2}:`, prodDesempenho);

    return res.json({ catVenda, prodVenda, prodDesempenho , catDesempenho });
};

module.exports = {
    cardYear
};
