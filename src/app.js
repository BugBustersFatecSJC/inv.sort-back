const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(routes);

module.exports = app;