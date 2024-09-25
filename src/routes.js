const express = require('express');
const router = express.Router();

// Importar controllers aqui
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');

// Coloque suas rotas aqui
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);

//Rotas de produtos
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.put('/products/:product_id', productController.updateProduct);
router.delete('/products/:product_id', productController.deleteProduct);

module.exports = router;