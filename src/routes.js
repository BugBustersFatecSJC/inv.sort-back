const express = require('express');
const router = express.Router();

// Importar controllers aqui
const userController = require('./controllers/userController');

// Coloque suas rotas aqui
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);

module.exports = router;