const express = require('express');
const Order = express.Router();
const { createOrder, getAllOrder, deleteOrder } = require('../../controller/user/order.user.controller');
const { verifyToken } = require('../../helper/user/userVerifyToken');

Order.post('/add-Order',verifyToken,createOrder);
Order.get('/get-All-Order',getAllOrder);
Order.delete('/delete-Order',verifyToken,deleteOrder);

module.exports = Order;