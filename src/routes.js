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
const auditLogMiddleware = require('./controllers/auditController');
const sectorchartController = require('./controllers/sectorchartController')

//Inicio das Rotas

router.get('/sectoranual', sectorchartController.sectorYear);
router.get('/check-login', userController.checkFirstLogin);
// router.get('/sectormensal', sectorchartController.SectorMonth);
router.get('/mensal', filterController.filterMonth);
router.get('/trimestral', filterController.filterTrimester);

// Rotas de Usuários
router.post('/users', upload.single('user_img'), userController.createUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);

//Rotas de Produtos
router.post('/products', productController.createProduct, auditLogMiddleware);
router.get('/products', productController.getAllProducts);
router.get('/products/:product_id', productController.getProductsbyId);
router.put('/products/:product_id',auditLogMiddleware, productController.updateProduct);
router.delete('/products/:product_id',auditLogMiddleware, productController.deleteProduct);
router.get('/products/category/:category_id', productController.getProductsByCategory);

// Rotas de Categorias
router.post('/category', upload.single('category_image'), categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/filter', categoryController.filterCategories);
router.put('/category/:category_id', upload.single('category_image'), categoryController.updateCategory);
router.delete('/category/:category_id', categoryController.deleteCategory);

// Rotas de Unidadaes
router.post('/unit', unitController.setUnit);
router.get('/unit', unitController.getAllUnits);
router.put('/unit/:unit_id', unitController.updateUnit);
router.delete('/unit/:unit_id', unitController.deleteUnit);

// Rotas de Suppliers
router.post('/supplier', supplierController.createSupplier);
router.get('/supplier', supplierController.getAllSuppliers);
router.put('/supplier/:supplier_id', supplierController.updateSupplier);
router.delete('/supplier/:supplier_id', supplierController.deleteSupplier);

//Fim das Rotas

module.exports = router;