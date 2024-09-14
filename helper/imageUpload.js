const multer = require('multer');

const userImage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'images/User');        
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

exports.userupload = multer({storage: userImage});


const productImage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'images/Product');
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    },
});

exports.productupload = multer({storage: productImage});