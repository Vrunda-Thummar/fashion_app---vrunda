const express = require("express");
const reviewRoutes = express.Router();
const { verifyToken } = require('../../helper/user/userVerifyToken');
const {
    addNewReview,
    getAllReview
} = require('../../controller/user/review.user.controller');

reviewRoutes.post("/newReview", verifyToken, addNewReview);
reviewRoutes.get("/allReview", verifyToken, getAllReview);


module.exports = reviewRoutes;