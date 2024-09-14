const Wishlist = require('../model/wishlist.model');

module.exports = class WishlistServices {
    async addToWishlist(body) {
        try {
            return await Wishlist.create(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from Wishlist Services" });
        }
    };

    async getWishlist(body){
        try {
            return await Wishlist.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json({message: "Server Error from Wishlist Services"});
        }
    };

    async getWishlistById(id){
        try {
            return await Wishlist.findById(id);
        } catch (error) {
            console.log(error);
            return res.json({message: "Server Error from Wishlist Services"});
        }
    };

    async getAllWishlist(body) {
        try {
            let results = await Wishlist.find(body).populate('wishlistItem').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
            return results;
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from Wishlist Services" });
        }
    };

    async updateWishlist(id, body) {
        try {
            return await Wishlist.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from Wishlist Services" });
        }
    };
};