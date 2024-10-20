const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sectorYear = async (req, res) => {
    prisma.$connect()
   
    const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  const result = [];
  const total = await prisma.$queryRaw`SELECT  SUM(quantity) AS total_difference FROM StockMovement WHERE movement_type = 'venda' AND YEAR(movement_date) = ${ano} and quantity is not null and category_id is not null ;`; 

    console.log("total", total);
    const results = await prisma.$queryRaw`
      SELECT 
        category_name,SUM(quantity) as total_difference
      FROM StockMovement inner join Category on StockMovement.category_id = Category.category_id
      WHERE movement_type = 'VENDA' AND  YEAR(movement_date) = ${ano} group by Category.category_name; ;
    `;
    console.log(results);
    let top5 = results.sort((a, b) => b.total_difference - a.total_difference).slice(0, 5); 
    console.log("top5", top5);
    let counter =1;
    top5.forEach(element => {

      element.total_difference = parseFloat(((element.total_difference / total[0].total_difference)).toFixed(2));
      counter = counter - element.total_difference;
    });
    top5.push({'category_name':'Outros', 'total_difference':parseFloat(counter.toFixed(2))});
    console.log("top5", top5);
   
  
  


  return res.status(200).json(top5);
};


const filterTrimester = async (req, res) => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
  } catch (error) {
    console.error('Error connecting to Prisma:', error);
    return res.status(500).json({ error: 'Failed to connect to the database' });
  }

  const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() ; 
  let ano = data.getFullYear();
  const result = [];

  try {
    for (let i = 0; i < 12; i+=3) {
      let currentMonth = mes - i;
      let currentYear = ano;

      if (currentMonth < 1) {
        currentMonth += 12;
        currentYear -= 1;
      }
      const currentQuarter = Math.ceil(currentMonth / 3);

      const results = await prisma.$queryRaw`
        SELECT 
          SUM(quantity) as  total_difference
        FROM StockMovement
        WHERE movement_type = 'venda' AND QUARTER(movement_date) = ${currentQuarter} AND YEAR(movement_date) = ${currentYear};
      `;

      const totalDifference = results[0]?.total_difference ?? 0;
      result.push({ name: `${currentMonth}-${currentYear}`, value: totalDifference });
    }

    console.log(result);
    return res.status(200).json(result.reverse());
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(400).json({ error: 'Erro ao buscar os dados' });
  } finally {
    await prisma.$disconnect();
  }
};



module.exports = {
    sectorYear}