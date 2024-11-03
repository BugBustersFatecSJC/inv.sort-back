const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sectorYear = async (req, res) => {
    prisma.$connect()
   
  const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = req.query.ano;
  let anoatual = data.getFullYear();
  const result = [];
  const totalq = await prisma.$queryRaw`SELECT  SUM(quantity) as value,year(movement_date) AS ano FROM db.StockMovement WHERE movement_type = 'venda' and quantity is not null and category_id is not null group by YEAR(movement_date);`; 
  const total ={}
  totalq.forEach(element => 
      total[element.ano] = element.value
  )
  

    console.log("total", total);
    const results = await prisma.$queryRaw`
      SELECT 
        category_name as name,SUM(quantity) as value,year(movement_date) AS ano
      FROM StockMovement inner join Category on StockMovement.category_id = Category.category_id
      WHERE movement_type = 'venda'  group by year(movement_date),category_name ;
    `;
    console.log(results);
    let top5 ={}
    results.forEach(element => {
      if (top5[element.ano] === undefined) {
        top5[element.ano] = [];
        };
        element.value>0? top5[element.ano].push(element):null})
    Object.keys(top5).forEach(element => {
      let counter = 100
      
      
      top5[element].forEach((el,index) => {
        counter = counter - (el.value/total[element]*100).toFixed(0)
        el['%'] = `${((el.value/total[element])*100).toFixed(0)}%`;
        
        
      }
      )
      counter > 0 ?top5[element].push({'name':'Outros','value': counter,'ano':element,'%':`${counter}%`}):null
    });
    console.log("top5", top5);
    
   
  
  


  return res.status(200).json(top5);
};



module.exports = {
    sectorYear    
}

