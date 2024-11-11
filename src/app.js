const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors());

app.use(express.json());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));

const directoryPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath), { recursive: true };
    console.log('Pasta criada com sucesso');
}

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use(routes);

module.exports = app;