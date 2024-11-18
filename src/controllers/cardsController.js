const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cardsYear = async (req, res) => {
  const abbreviateNumber =(value) => {
    let newValue = value;
    const suffixes = ["", " Mil", " M", " Bi"," T"];
    let suffixNum = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }
    console.log(newValue,'newValue');
    
    newValue = newValue.toString().length > 2 ? newValue.toPrecision(3) : newValue.toPrecision();
  
    newValue += suffixes[suffixNum];
    return newValue;
  }
    try{
      await prisma.$connect();
   
    const data = new Date();
    const dia = data.getDate();
    let mes = data.getMonth() ; 
    const ano = data.getFullYear();
 
    let catVenda = await prisma.$queryRaw`
    SELECT category.category_name, SUM(sm.quantity) as vendas
    FROM StockMovement AS sm
    JOIN Product AS p ON sm.category_id = p.category_id
    JOIN Category AS category ON p.category_id = category.category_id
    WHERE sm.movement_type = 'venda'
      AND MONTH(sm.movement_date) = ${mes} AND YEAR(sm.movement_date) = ${ano} AND category.category_name IS NOT NULL
    GROUP BY category.category_name
    ORDER BY SUM(sm.quantity) DESC
    LIMIT 1;
  `;
   
    catVenda.length !== 0 ? catVenda = {category_name: catVenda[0].category_name,vendas: abbreviateNumber(catVenda[0].vendas)}:catVenda = {category_name: 'Sem resultado',vendas: 0}

    console.log(catVenda);
    
    let prodVenda = await prisma.$queryRaw`
    SELECT p.product_name, SUM(sm.quantity) as vendas
    FROM StockMovement AS sm
    JOIN Product AS p ON sm.product_id = p.product_id
    WHERE sm.movement_type = 'venda'
      AND MONTH(sm.movement_date) = ${mes} AND YEAR(sm.movement_date) = ${ano}
    GROUP BY p.product_name
    ORDER BY SUM(sm.quantity) DESC
    LIMIT 1;
  `;
     prodVenda.length !== 0 ?  prodVenda = {product_name: prodVenda[0].product_name,vendas: abbreviateNumber(prodVenda[0].vendas)}:prodVenda = {product_name:'Sem Resultado',vendas:0}  
     console.log(prodVenda);

   
     let prodFaturamento = await prisma.$queryRaw`
     SELECT p.product_name, (SUM(sm.quantity) * p.prod_sell_value) as faturamento
     FROM StockMovement AS sm
     JOIN Product AS p ON sm.product_id = p.product_id
     WHERE sm.movement_type = 'venda'
       AND MONTH(sm.movement_date) = ${mes} AND YEAR(sm.movement_date) = ${ano} AND p.product_name IS NOT NULL
     GROUP BY p.product_name
     ORDER BY faturamento DESC
     LIMIT 1;
   `;
   prodFaturamento.length !== 0?prodFaturamento = {product_name: prodFaturamento[0].product_name,faturamento: abbreviateNumber(prodFaturamento[0].faturamento)}: prodFaturamento = {product_name:'Sem Resultado',faturamento: 0}
      console.log(prodFaturamento);
      
    let catFaturamento = await prisma.$queryRaw`
    SELECT c.category_name, SUM(faturamento) as soma
    FROM (
      SELECT p.category_id, p.product_name, (SUM(sm.quantity) * p.prod_sell_value) as faturamento
      FROM StockMovement AS sm
      JOIN Product AS p ON sm.category_id = p.category_id
      WHERE sm.movement_type = 'venda'
        AND MONTH(sm.movement_date) = ${mes} AND YEAR(sm.movement_date) = ${ano}
      GROUP BY p.product_name
    ) AS faturamentos
    JOIN Category AS c ON faturamentos.category_id = c.category_id
    GROUP BY c.category_name
    ORDER BY soma DESC
    LIMIT 1;
  `;
    catFaturamento.length !== 0? catFaturamento = {category_name: catFaturamento[0].category_name,faturamento: abbreviateNumber(catFaturamento[0].soma)}: catFaturamento = {category_name:'Sem Resultado',faturamento: 0}
    console.log(catFaturamento);
    
   result = [prodFaturamento , catFaturamento,catVenda,prodVenda];
   console.log('res',result);
   
   console.log(result);
   
    return res.status(200).json(result) ;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Erro ao buscar dados." });
    }
};
module.exports = { 
  cardsYear
}