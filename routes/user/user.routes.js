const express = require('express');
const User = express.Router();
const { userupload } = require('../../helper/imageUpload');
const { registerUser, getAllUser, getUser, logInUser, updateUser, updatePassword, deleteUser } = require('../../controller/user/user.controller');
const { verifyToken } = require('../../helper/user/userVerifyToken');

User.post('/registerUser',userupload.single('profileImage'),registerUser);
User.get('/getAllUser',userupload.none(),getAllUser);
User.get('/logInUser',logInUser);
User.get('/getUser',verifyToken,getUser);
User.put('/updateUser',verifyToken,userupload.single('profileImage'),updateUser);
User.put('/updateUserPass',verifyToken,updatePassword);
User.delete('/deleteUser',verifyToken,deleteUser);

module.exports = User;