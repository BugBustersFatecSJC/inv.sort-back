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
      JOIN Product AS p ON sm.product_id = p.product_id
      JOIN Category AS category ON p.category_id = category.category_id
      WHERE sm.movement_type = 'venda'
        AND MONTH(sm.movement_date) = ${mes}
      GROUP BY category.category_name
      ORDER BY SUM(sm.quantity) DESC
      LIMIT 1;
    `;
    catVenda = {category_name: catVenda[0].category_name,vendas: abbreviateNumber(catVenda[0].vendas)};


    let prodVenda = await prisma.$queryRaw`
      SELECT p.product_name,SUM(sm.quantity) as vendas
      FROM StockMovement AS sm
      JOIN Product AS p ON sm.product_id = p.product_id
      WHERE sm.movement_type = 'venda'
        AND MONTH(sm.movement_date) = ${mes}
      GROUP BY p.product_name
      ORDER BY SUM(sm.quantity) DESC
      LIMIT 1;
    `;
      prodVenda = {product_name: prodVenda[0].product_name,vendas: abbreviateNumber(prodVenda[0].vendas)};


    let prodFaturamento = await prisma.$queryRaw` SELECT 
   p.product_name, (sum(quantity)*p.prod_sell_value) as faturamento
   FROM db.StockMovement as sm join db.Product as p
   WHERE movement_type = 'venda' and p.product_id = sm.product_id AND MONTH(movement_date) = ${mes} AND YEAR(movement_date) = ${ano} group by p.product_name order by faturamento desc limit 1;`
      prodFaturamento = {product_name: prodFaturamento[0].product_name,faturamento: abbreviateNumber(prodFaturamento[0].faturamento)};

   let catFaturamento = await prisma.$queryRaw` 
   select c.category_name,sum(faturamento) as soma from ( SELECT 
   p.category_id,p.product_name, (sum(quantity)*p.prod_sell_value) as faturamento
   FROM db.StockMovement as sm join db.Product as p
   WHERE movement_type = 'venda' and p.product_id = sm.product_id AND MONTH(movement_date) = ${mes} AND YEAR(movement_date) = ${ano}  group by p.product_name order by faturamento) AS faturamentos join db.Category as c on faturamentos.category_id=c.category_id group by c.category_name order by soma desc limit 1;`;
    catFaturamento = {category_name: catFaturamento[0].category_name,faturamento: abbreviateNumber(catFaturamento[0].soma)};
   result = [prodFaturamento , catFaturamento,catVenda,prodVenda];
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