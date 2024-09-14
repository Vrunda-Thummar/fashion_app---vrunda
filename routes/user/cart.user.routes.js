const express = require('express');
const Cart = express.Router();
const { verifyToken } = require('../../helper/user/userVerifyToken');
const { addToCart, getCart, updateCart, deleteCart } = require('../../controller/user/cart.user.controller');

Cart.post('/add-Cart',verifyToken, addToCart);
Cart.get('/get-Cart',verifyToken,getCart);
Cart.put('/update-Cart',verifyToken,updateCart);
Cart.delete('/delete-Cart',verifyToken,deleteCart);

module.exports = Cart;