const express = require('express');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

module.exports = app;
