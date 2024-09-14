const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type : String,
        unique : true,
        required : true
    },
    productImage: {
        type : String,
    },
    productPrice: {
        type: String,
        required : true
    },
    productReviews:[{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        rating: { 
            type: Number, 
            required: true 
        },
        comment: { 
            type: String 
        }
    }],
    averageRating: { 
        type: Number, 
        default: 0 
    },
    productBrand: {
        type : String
    },
    description: {
        type : String
    },
    category: {
        type : String
    },
    isDelete: {
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

module.exports = mongoose.model('products', productSchema);