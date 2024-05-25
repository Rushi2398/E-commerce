const express = require('express');
const { createOrder, getOrders } = require('../controller/orderController');
const { authenticateToken } = require('../../../common/authMiddleware'); // Adjust the path accordingly
const router = express.Router();

router.use(authenticateToken)
router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;
