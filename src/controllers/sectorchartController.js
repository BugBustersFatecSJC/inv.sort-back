const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const valorAntigo = async (req, res) => {
  const data = new Date();
  const ano = data.getFullYear();
  const result = await prisma.$queryRaw`select min(year(movement_date)) as ano from db.StockMovement where movement_type = 'venda' group by year(movement_date) limit 1;`;
  const anos =[]
  for (let i = result[0].ano; i <= ano; i++) {
    anos.push(i.toString());
  }
  if (anos) {
    return res.status(200).json(anos.reverse());
  }
  return res.status(404).json({ message: 'Nenhum registro encontrado' });

}
const sectorYear = async (req, res) => {
    prisma.$connect()

  const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = req.query.ano|| data.getFullYear();
  const result = [];
  const total = await prisma.$queryRaw`SELECT  SUM(quantity) AS total_difference FROM StockMovement as sm inner join Category as c on sm.category_id=c.category_id WHERE movement_type = 'venda' AND YEAR(movement_date) = ${ano} and quantity is not null and c.category_id is not null ;`; 


    console.log("total", total);
    const results = await prisma.$queryRaw`
      SELECT 
        c.category_name,SUM(quantity) as total_difference
      FROM StockMovement as sm inner join Category as c on sm.category_id = c.category_id
      WHERE sm.movement_type = 'venda' AND  YEAR(sm.movement_date) = ${ano} and c.category_name is not null and c.category_id is not null  group by c.category_name ;
    `;
    console.log(results,'results');
    let top5 = results.sort((a, b) => b.total_difference - a.total_difference).slice(0, 5); 
    console.log("top5", top5);
    let counter =100;
    top5.forEach(element => {
      element['%'] = `${((element.total_difference / total[0].total_difference)*100).toFixed(0)}%`;
      element.total_difference = parseFloat(((element.total_difference / total[0].total_difference)*100).toFixed(2));
      counter = counter - element.total_difference;
    });
   counter > 0 ? top5.push({category_name:'Outros',total_difference:parseFloat(counter.toFixed(2)),'%':`${counter.toFixed(0)}%`}) : null;
    console.log("top5", top5);
   
  
  


  return res.status(200).json(top5);
};



module.exports = {
    sectorYear ,valorAntigo   
}