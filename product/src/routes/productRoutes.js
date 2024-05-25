const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controller/productController');
const { authenticateToken } = require('../../../common/authMiddleware'); 
const router = express.Router();

router.use(authenticateToken);

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
