// server.js
const app = require('./app');
const port = 3001;
require('dotenv').config();


app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
});