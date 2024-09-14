const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    productId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true,
    versionKey : false
});

module.exports = mongoose.model('wishlist',wishlistSchema);