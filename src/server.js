// server.js
const app = require('./app');
const port = 3001;

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
});