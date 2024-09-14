// const jwt = require('jsonwebtoken');
// const User = require('../../model/user.model');

// exports.adminVerifyToken = async (req,res,next) => {
//     try {
//         const authorized = req.headers['authorization'];
//         if(typeof authorized !== 'undefined'){
//             let token = authorized.split(" ")[1];
//             // console.log("Token is => ",token);
//             const { adminID } = jwt.verify(token, 'Admin');
//             // console.log("userId is here => ",adminID);
//             req.admin = await User.findOne({ _id:adminID , isDelete : false});
//             // console.log("req.user is here => ",req.user);
//             req.admin ? next() : res.json({message : 'Invalid user'});  // if else statment
//         } else {
//             res.json({message : "Token is Invalid OR token is not found"});
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({message: 'Internal Server Error "From verifyToken"'});
//     }
// };

const jwt = require('jsonwebtoken');
const User = require('../../model/user.model');

exports.verifyToken = async (req, res, next) => {
    try {
        let authorization = req.headers['authorization'];
        // console.log(authorization);
        
        if (!authorization)
            return res.json({ message: 'Not authorization' });
        let token = authorization.split(" ")[1];
        // console.log(token);
        // console.log(process.env.JWT_SECRET);
        
        let { adminId } = await jwt.verify(token, process.env.JWT_SECRET);
        let admin = await User.findOne({ _id: adminId, isDelete: false })
        if (!admin)
            return res.json({ message: 'User Authorization Not Fonded' })
        req.admin = admin;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}