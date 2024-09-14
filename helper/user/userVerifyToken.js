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
        
        let { userID } = await jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ _id: userID, isDelete: false })
        if (!user)
            return res.json({ message: 'User Authorization Not Fonded' })
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}