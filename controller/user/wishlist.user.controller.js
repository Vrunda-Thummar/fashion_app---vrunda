const WishlistServices = require('../../services/wishlist.services');
const wishlistService = new WishlistServices();

exports.addToWishlist = async (req, res) => {
    try {
        let Wishlist = await wishlistService.getWishlist({ user: req.user._id ,productId: req.body.productId , isDelete : false});
        // console.log(Wishlist);
        if (Wishlist) {
            return res.json({ message: "Product already added to the Wishlist" });
        };
        Wishlist = await wishlistService.addToWishlist({
            user: req.user._id,
            ...req.body
        });
        return res.json({message: "Product added to Wishlist succesfully", Wishlist});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from Wishlist controller" });
    }
};

exports.getAllWishlist = async (req,res)=>{
    try {
        // let me = req.query.me;
        let Wishlist = await wishlistService.getAllWishlist({user: req.user._id , isDelete: false});
        if (!Wishlist) {
            return res.json({message: "Wishlist Product is not found"});
        };
        return res.json({Wishlist: Wishlist});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from Wishlist controller"});
    }
};

exports.deleteWishlist = async(req,res)=>{
    try {
        let Wishlist = await wishlistService.getWishlist({user: req.user._id ,isDelete : false});
        console.log(Wishlist);
        if (!Wishlist) {
            return res.json({message: "Wishlist Item is not found..Please try again"});
        };
        Wishlist = await wishlistService.updateWishlist(req.body.WishlistID,{isDelete: true});
        return res.json({message: "Wishlist Item is deleted succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from Wishlist controller"});
    }
};