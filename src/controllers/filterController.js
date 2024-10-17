const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const filterMonth = async (req, res) => {
    prisma.$connect()
   
    
    const data = new Date();
  const dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  const result = [];

  for (let i = 0; i < 12; i++) {
    let currentMonth = mes - i;
    let currentYear = ano;

    if (currentMonth < 1) {
      currentMonth += 12;
      currentYear -= 1;
    }

    const results = await prisma.$queryRaw`
      SELECT 
        SUM(CAST(old_value AS DECIMAL(10, 2)) - CAST(new_value AS DECIMAL(10, 2))) AS total_difference
      FROM AuditLog
      WHERE action = 'venda' AND MONTH(action_date) = ${currentMonth} AND YEAR(action_date) = ${currentYear};
    `;

    const totalDifference = results[0]?.total_difference ?? 0;
    result.push({ name: `${currentMonth}-${currentYear}`, value: totalDifference });
  }

  console.log(result);
  const resultado = result.reverse();
  return res.status(200).json(resultado);
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
          SUM(CAST(old_value AS DECIMAL(10, 2)) - CAST(new_value AS DECIMAL(10, 2))) AS total_difference
        FROM AuditLog
        WHERE action = 'venda' AND QUARTER(action_date) = ${currentQuarter} AND YEAR(action_date) = ${currentYear};
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
    filterMonth,filterTrimester}