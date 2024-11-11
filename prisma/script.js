const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid'); // Importando v4 do pacote uuid

const prismaClient = new PrismaClient();

async function seedDatabase() {
  // Criando categorias com nomes únicos
  const categories = [];
  for (let i = 0; i < 10; i++) {
    const uniqueCategoryName = `${faker.commerce.department()} ${i + 1} - ${uuidv4()}`; // Usando uuidv4()
    const category = await prismaClient.category.create({
      data: {
        category_name: uniqueCategoryName,
      },
    });
    categories.push(category);  // Adicionando à lista de categorias
  }

  // Criando fornecedores
  const suppliers = [];
  for (let i = 0; i < 10; i++) {
    suppliers.push(
      await prismaClient.supplier.create({
        data: {
          supplier_name: faker.company.name(),
          contact_info: faker.phone.number(),
          address: faker.address.streetAddress(),
        },
      })
    );
  }

  // Criando locais e setores
  const locations = [];
  const sectors = [];
  for (let i = 0; i < 3; i++) {
    const locationName = `Local ${uuidv4()}`; // Usando uuidv4() para garantir um nome único
    const location = await prismaClient.local.create({
      data: {
        local_name: locationName,
        local_address: faker.address.streetAddress(),
      },
    });
    locations.push(location);

    for (let j = 0; j < 3; j++) {
      sectors.push(
        await prismaClient.sector.create({
          data: {
            sector_name: `Setor ${j + 1} - ${locationName}`,
            local_id: location.local_id,
          }
        })
      );
    }
  }

  // Criando produtos
  const products = [];
  for (let i = 0; i < 10; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
    
    const product = await prismaClient.product.create({
      data: {
        product_name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        product_stock: Math.floor(Math.random() * 100),
        product_stock_min: Math.floor(Math.random() * 50),
        category_id: category.category_id,
        supplier_id: supplier.supplier_id,
        unit_id: 2, // kg
        is_perishable: Math.random() > 0.5,
        prod_cost_value: parseFloat(faker.commerce.price()),
        prod_sell_value: parseFloat(faker.commerce.price()),
      }
    });
    products.push(product);
  }

  // Criando 40 movimentações de estoque
  const stockMovements = [];
  for (let i = 0; i < 40; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    
    const batch = await prismaClient.batch.create({
      data: {
        product_id: product.product_id,
        quantity: Math.floor(Math.random() * 100),
        batch_value_total: parseFloat(faker.commerce.price()),
        quantity_max: Math.floor(Math.random() * 200)  // Adicionando o campo 'quantity_max'
      },
    });

    stockMovements.push(
      await prismaClient.stockMovement.create({
        data: {
          batch_id: batch.batch_id,
          quantity: Math.floor(Math.random() * 50),
          movement_type: Math.random() > 0.5 ? 'compra' : 'venda',
          movement_date: faker.date.past(),
          user_id: 1, // Assumindo que o usuário com ID 1 existe
          product_id: product.product_id,
          category_id: product.category_id,
        }
      })
    );
  }

  console.log('Database seeded successfully!');
}

seedDatabase()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
