const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use(routes);

module.exports = app;