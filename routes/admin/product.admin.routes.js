const express = require('express');
const adminProduct = express.Router();
const {productupload} = require('../../helper/imageUpload');
const { addProduct, getAllProduct, getSpeProduct, updateProduct, deleteProduct } = require('../../controller/admin/product.admin.controller');

adminProduct.post('/addNewProduct', productupload.single("productImage"),addProduct);
adminProduct.get('/getAllProduct',getAllProduct);
adminProduct.get('/getProduct',getSpeProduct);
adminProduct.put('/updateProduct',updateProduct);
adminProduct.delete('/deleteProduct',deleteProduct);

module.exports = adminProduct;