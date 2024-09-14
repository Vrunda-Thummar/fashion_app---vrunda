// const WishlistServices = require('../../services/wishlist.services');
// const wishlistService = new WishlistServices();

// exports.addToWishlist = async (req, res) => {
//     try {
//         // console.log("Wishlist Item is => ",req.body.WishlistItem);
//         let Wishlist = await wishlistService.getWishlist({ wishlistItem: req.body.wishlistItem ,user: req.user._id ,isDelete : false});
//         // console.log(Wishlist);
//         if (Wishlist) {
//             return res.json({ message: "Product already added to the wishlist" });
//         };
//         Wishlist = await wishlistService.addToWishlist({
//             ...req.body,user: req.user._id
//         });
//         return res.json({Wishlist,message: "Product added to wishlist succesfully"});
//     } catch (error) {
//         console.log(error);
//         return res.json({ message: "Server Error from wishlist controller" });
//     }
// };

// exports.getAllWishlist = async (req,res)=>{
//     try {
//         let Wishlist = await wishlistService.getAllWishlist({isDelete: false});
//         if (!Wishlist) {
//             return res.json({message: "wishlist Product is not found"});
//         };
        
//     } catch (error) {
//         console.log(error);
//         return res.json({message: "Server Error from wishlist controller"});
//     }
// }