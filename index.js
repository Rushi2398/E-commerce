const express = require('express');
const userRoutes = require('./user/src/routes/userRoutes')
const orderRoutes = require('./order/src/routes/orderRoutes')
const productRoutes = require('./product/src/routes/productRoutes')
require('dotenv').config()

const app = express();
app.use(express.json());

app.use('/users',userRoutes);
app.use('/orders',orderRoutes);
app.use('/products',productRoutes);

app.get('/', ()=>{
    res.send("Welcome to e-commerce api")
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})