const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const filterMonth = async (req, res) => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
  } catch (error) {
    console.error('Error connecting to Prisma:', error);
    return res.status(500).json({ error: 'Failed to connect to the database' });
  }

  const category =  req.query.category;
  const product = req.query.product;
  console.log('category', category);
  console.log('product', product);

  const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  const result = [];

  try {
    for (let i = 0; i < 12; i++) {
      let currentMonth = mes - i;
      let currentYear = ano;

      if (currentMonth < 1) {
        currentMonth += 12;
        currentYear -= 1;
      }

      let results = [];
      if (!product && !category) {
        results = await prisma.$queryRaw`
          SELECT 
          SUM(quantity) as vendas
          FROM StockMovement
          WHERE movement_type = 'venda' AND MONTH(movement_date) = ${currentMonth} AND YEAR(movement_date) = ${currentYear};
        `;
      } else if (!product) {
        results = await prisma.$queryRaw`
          SELECT 
          SUM(quantity) as vendas
          FROM StockMovement
          WHERE movement_type = 'venda' AND category_id = ${category}  and product_id = ${product} AND MONTH(movement_date) = ${currentMonth} AND YEAR(movement_date) = ${currentYear};
        `;
        const totalDifference = results[0]?.vendas ?? 0;
        result.push({ name: `${currentMonth}/${currentYear-2000}`, value: totalDifference });
      } else {
        results = await prisma.$queryRaw`
          SELECT 
          SUM(quantity) as vendas
          FROM db.StockMovement
          WHERE movement_type = 'venda' AND category_id = ${category} AND MONTH(movement_date) = ${currentMonth} AND YEAR(movement_date) = ${currentYear};
        `;
          
        const totalDifference = results[0]?.vendas ?? 0;  
        result.push({ name: `${currentMonth}/${currentYear-2000}`, value: totalDifference });
      }
      
      
  
    }


    const resultado = result.reverse();
    return res.status(200).json(resultado);
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(400).json({ error: 'Erro ao buscar os dados' });
  } finally {
    await prisma.$disconnect();
  }
};

const filterTrimester = async (req, res) => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
  } catch (error) {
    console.error('Error connecting to Prisma:', error);
    return res.status(500).json({ error: 'Failed to connect to the database' });
  }
  
  const category =  req.query.category;
  const product = req.query.product;
  console.log('category2', category);
  console.log('2', product);
  const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  const result = [];

  try {
    for (let i = 0; i < 12; i += 3) {
      let currentMonth = mes - i;
      let currentYear = ano;

      if (currentMonth < 1) {
        currentMonth += 12;
        currentYear -= 1;
      }
      const currentQuarter = Math.ceil(currentMonth / 3);
      
      if (!product && !category) {
        results = [];
      } else if (!product) {
       
       results = await prisma.$queryRaw`
      SELECT 
        SUM(quantity) AS vendas
      FROM StockMovement
      WHERE movement_type = 'venda' AND QUARTER(movement_date) = ${currentQuarter} AND YEAR(movement_date) = ${currentYear} AND category_id = ${category};
    `;
      console.log('oi',results);

      const totalDifference = results[0]?.vendas ?? 0;
      result.push({ name: `${currentMonth}-${currentYear}`, value: totalDifference })
      } else {
        results = await prisma.$queryRaw`
          SELECT 
          SUM(quantity) as vendas
          FROM db.StockMovement
           WHERE movement_type = 'venda' AND category_id = ${category} AND MONTH(movement_date) = ${currentMonth} AND YEAR(movement_date) = ${currentYear} AND product_id = ${product} and category_id = ${category};
        `;
        
        console.log('oi',results);
      const totalDifference = results[0]?.vendas ?? 0;
      result.push({ name: `${currentMonth}-${currentYear}`, value: totalDifference })
      }
      
      
    }

    
    return res.status(200).json(result.reverse());
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(400).json({ error: 'Erro ao buscar os dados' });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  filterMonth,
  filterTrimester
};