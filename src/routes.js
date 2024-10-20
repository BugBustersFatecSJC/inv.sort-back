const express = require('express')
const router = express.Router()
const upload = require('./middlewares/uploadImageMiddleware')

// Importar controllers aqui
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
<<<<<<< HEAD
const categoryController = require('./controllers/categoryController');
const unitController = require('./controllers/unitController');
const supplierController = require('./controllers/supplierController');
const filterController = require('./controllers/filterController');
const localController = require('./controllers/localController'); 
const sectorController = require('./controllers/sectorController'); 
const batchController = require('./controllers/batchController')
=======
const categoryController = require('./controllers/categoryController')
const unitController = require('./controllers/unitController')
const supplierController = require('./controllers/supplierController')
const filterController = require('./controllers/filterController')
const sectorchartController = require('./controllers/sectorchartController')


//Inicio das Rotas
>>>>>>> 7a6b10459323d54a6eee93b7601f6c48e207cc21

// Rotas para login e filtros
router.get('/check-login', userController.checkFirstLogin);
router.get('/sectormensal', sectorchartController.SectorMonth);
router.get('/mensal', filterController.filterMonth);
router.get('/trimestral', filterController.filterTrimester);

// Rotas de Usuários
router.post('/users', upload.single('user_img'), userController.createUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);

// Rotas de Produtos
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:product_id', productController.getProductsbyId);
router.get('/products/category/:category_id', productController.getProductsByCategory);
router.put('/products/:product_id', productController.updateProduct);
router.delete('/products/:product_id', productController.deleteProduct);

<<<<<<< HEAD
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
router.post('/category', categoryController.createCategory);
=======
// Rotas de Categorias
router.post('/category', upload.single('category_image'), categoryController.createCategory);
>>>>>>> 7a6b10459323d54a6eee93b7601f6c48e207cc21
router.get('/category', categoryController.getAllCategories);
router.put('/category/:category_id', upload.single('category_image'), categoryController.updateCategory);
router.delete('/category/:category_id', categoryController.deleteCategory);

<<<<<<< HEAD
// Rotas de Unidades
=======
// Rotas de Unidadaes
>>>>>>> 7a6b10459323d54a6eee93b7601f6c48e207cc21
router.post('/unit', unitController.setUnit);
router.get('/unit', unitController.getAllUnits);
router.put('/unit/:unit_id', unitController.updateUnit);
router.delete('/unit/:unit_id', unitController.deleteUnit);

// Rotas de Suppliers
router.post('/supplier', supplierController.createSupplier);
router.get('/supplier', supplierController.getAllSuppliers);
router.put('/supplier/:supplier_id', supplierController.updateSupplier);
router.delete('/supplier/:supplier_id', supplierController.deleteSupplier);

// fim das rotas

module.exports = router;
