const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/orders', orderRoutes);

module.exports = app;
