const express = require('express');
const app = express();
const userRoutes = require('./path/to/your/routes');

// Middleware para parsing de JSON
app.use(express.json());

// Use as rotas de usuários
app.use('/api', userRoutes);

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
