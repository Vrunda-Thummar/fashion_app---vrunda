const express = require('express');
const Wishlist = express.Router();
const { userupload } = require('../../helper/imageUpload');
const { addToWishlist, getAllWishlist, deleteWishlist } = require('../../controller/user/wishlist.user.controller');
const { verifyToken } = require('../../helper/user/userVerifyToken');

Wishlist.post('/add-Wishlist',verifyToken, userupload.none(),addToWishlist);
Wishlist.get('/get-Wishlist',verifyToken,getAllWishlist);
Wishlist.delete('/delete-Wishlist',userupload.none(),verifyToken,deleteWishlist);

module.exports = Wishlist;