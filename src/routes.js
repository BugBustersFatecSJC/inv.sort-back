const express = require('express')
const router = express.Router()
const upload = require('./middlewares/uploadImageMiddleware')

// Importar controllers aqui
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController')
const unitController = require('./controllers/unitController')
const supplierController = require('./controllers/supplierController')
const filterController = require('./controllers/filterController')
const localController = require('./controllers/localController'); 
const sectorController = require('./controllers/sectorController'); 
const batchController = require('./controllers/batchController');
const auditLogMiddleware = require('./controllers/auditController');
const sectorchartController = require('./controllers/sectorchartController');
const cardsController = require('./controllers/cardsController');
const stockMoveController = require('./controllers/stockmoveController');


//Inicio das Rotas
// Rotas de Cards
router.get('/cards', cardsController.cardsYear);
// Rotas para login e filtros
router.get('/check-login', userController.checkFirstLogin);
router.get('/sectoranual', sectorchartController.sectorYear);
router.get('/valorantigo',sectorchartController.valorAntigo);
router.get('/mensal', filterController.filterMonth);
router.get('/trimestral', filterController.filterTrimester);
router.get('/check-first-login', userController.checkFirstLogin);
//router.get('/sectormensal', sectorchartController.SectorMonth);

// Rotas de Usuários
router.post('/users', upload.single('user_img'), userController.createUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);

//Rotas de Produtos
router.post('/products', upload.single('product_img'), productController.createProduct, auditLogMiddleware);
router.get('/products', productController.getAllProducts);
router.get('/products/:product_id', productController.getProductsbyId);
router.put('/products/:product_id', upload.single('product_img'), auditLogMiddleware, productController.updateProduct);
router.delete('/products/:product_id',auditLogMiddleware, productController.deleteProduct);
router.get('/products/category/:category_id', productController.getProductsByCategory);

// Rotas de Localizações (Locais)
router.post('/local', localController.createLocal);
router.get('/local', localController.getAllLocals); 
router.put('/local/:local_id', localController.updateLocal); 
router.delete('/local/:local_id', localController.deleteLocal); 

// Rotas de Setores
router.post('/sector', sectorController.createSector); 
router.get('/sector', sectorController.getAllSectors); 
router.put('/sector/:sector_id', sectorController.updateSector); 
router.delete('/sector/:sector_id', sectorController.deleteSector); 

// Rotas de Lotes
router.post('/batch', batchController.createBatch);
router.get('/batch', batchController.getAllBatches);
router.put('/batch/:batch_id', batchController.updateBatch);
router.delete('/batch/:batch_id', batchController.deleteBatch);

// Rotas de Categorias
router.post('/category', upload.single('category_image'), categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/filter', categoryController.filterCategories);
router.put('/category/:category_id', upload.single('category_image'), categoryController.updateCategory);
router.delete('/category/:category_id', categoryController.deleteCategory);

// Rotas de Unidades
router.post('/unit', unitController.setUnit);
router.get('/unit', unitController.getAllUnits);
router.put('/unit/:unit_id', unitController.updateUnit);
router.delete('/unit/:unit_id', unitController.deleteUnit);

// Rotas de Suppliers
router.post('/supplier', supplierController.createSupplier);
router.get('/supplier', supplierController.getAllSuppliers);
router.put('/supplier/:supplier_id', supplierController.updateSupplier);
router.delete('/supplier/:supplier_id', supplierController.deleteSupplier);

// Rotas do Fluxo de Estoque "BUYANDSELL"
router.put('/buyandsell/:batch_id', batchController.sellBatch);

router.get('/buyandsell/:product_id/batches', batchController.getBatchesByProductId);

router.put('/buyandsell/sell/:product_id', batchController.sellBatchByProductId);
router.post('/buyandsell/buy/:product_id', batchController.buyBatchByProductId);


// Rotas de Movimentação de estoque
router.get('/movementpage', stockMoveController.getAllStockMovements);
router.post('/filter-stock-movement', stockMoveController.getAllStockMovements);

// fim das rotas

module.exports = router;