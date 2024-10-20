const express = require('express');
const router = express.Router();

// Importar controllers aqui
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController')
const unitController = require('./controllers/unitController')
const supplierController = require('./controllers/supplierController')
const filterController = require('./controllers/filterController')
const { loginUser } = require('./controllers/userController'); // Importando o controlador
const auditLogMiddleware = require('./controllers/auditController');


//Inicio das Rotas

router.get('/check-login', userController.checkFirstLogin);

router.get('/mensal', filterController.filterMonth);
router.get('/trimestral', filterController.filterTrimester);

// Rotas de Usuários
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);

//Rotas de Produtos
router.post('/products', productController.createProduct, auditLogMiddleware);
router.get('/products', productController.getAllProducts);
router.get('/products/:product_id', productController.getProductsbyId);
router.put('/products/:product_id',auditLogMiddleware, productController.updateProduct);
router.delete('/products/:product_id',auditLogMiddleware, productController.deleteProduct);

//Rotas de Categorias
router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/filter', categoryController.filterCategories);
router.put('/category/:category_id', categoryController.updateCategory);
router.delete('/category/:category_id', categoryController.deleteCategory);

//Rotas de Unidadaes
router.post('/unit', unitController.setUnit);
router.get('/unit', unitController.getAllUnits);
router.put('/unit/:unit_id', unitController.updateUnit);
router.delete('/unit/:unit_id', unitController.deleteUnit);

//Rotas de Suppliers
router.post('/supplier', supplierController.createSupplier);
router.get('/supplier', supplierController.getAllSuppliers);
router.put('/supplier/:supplier_id', supplierController.updateSupplier);
router.delete('/supplier/:supplier_id', supplierController.deleteSupplier);

//Fim das Rotas

module.exports = router;
