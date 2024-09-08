// src/app.js

const express = require('express');
require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Framework Project!');
});

module.exports = app;
