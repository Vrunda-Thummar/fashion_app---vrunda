const express = require('express');
const Admin = express.Router();
const { userupload } = require('../../helper/imageUpload');
const { verifyToken } = require('../../helper/admin/adminVerifytoken');
const { registerAdmin, getAllAdmin, logInAdmin, updateAdmin, deleteAdmin, updatePassword, getAdmin } = require('../../controller/admin/admin.controller');

Admin.post('/registerAdmin', userupload.single('profileImage'), registerAdmin);
Admin.get('/getAllAdmin', getAllAdmin);
Admin.get('/getAdmin', verifyToken, getAdmin);
Admin.get('/log-In_Admin', logInAdmin);
Admin.put('/updateAdmin', verifyToken,userupload.single('profileImage'), updateAdmin);
Admin.put('/updateAdminPass', verifyToken, updatePassword);
Admin.delete('/deleteAdmin', verifyToken, deleteAdmin);

module.exports = Admin;