const CartService = require('../../services/cart.services');
const cartServices = new CartService();

exports.getAllCart = async (req,res)=>{
    try {
        let cart = await cartServices.getAllCart({isDelete: false});
        // console.log(cart);
        if (!cart) {
            return res.json({message: "Cart Item is not found..Please try again"});
        };
        return res.json({cart})
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from Admin controller"});
    }
};