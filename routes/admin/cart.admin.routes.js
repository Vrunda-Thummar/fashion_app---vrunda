const express = require('express');
const cartAdmin = express;
const {verifyToken} = require('../../helper/admin/adminVerifytoken');
const { getAllCart } = require('../../controller/admin/cart.admin.controller');

cartAdmin.post('/get-Cart',verifyToken,getAllCart);

module.exports = cartAdmin;