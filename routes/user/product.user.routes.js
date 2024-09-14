const express = require('express');
const userProduct = express.Router();
const { getAllProduct, getSpeProduct } = require('../../controller/user/product.user.controller');

userProduct.get('/getAllProduct',getAllProduct);
userProduct.get('/getProduct',getSpeProduct);

module.exports = userProduct;