const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Teste');
})

// Criação do servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})