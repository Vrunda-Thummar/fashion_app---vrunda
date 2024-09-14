const Cart = require('../model/cart.model');

module.exports = class cartServices {
    async addToCart(body) {
        try {
            return await Cart.create(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from cart services" });
        }
    };

    async getCart(body) {
        try {
            return await Cart.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from cart services" });
        }
    };

    async getCartById(id) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from cart services" });
        }
    };

    async getAllCart(query,user) {
        try {
            let body = { isDelete: false };
            if (query.me === 'true') {
                body.user = user._id
            }
            let results = await Cart.find(body).populate('productId').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
            return results;
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from cart services" })
        }
    };

    async updateCart(id, body) {
        try {
            return await Cart.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from cart services" })
        }
    };

    async updatemanyCart(userId){
        try {
            return await Cart.updateMany({user: userId, isDelete: false}, {isDelete: true}, {new: true})
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from order services" });
        }
    }
};