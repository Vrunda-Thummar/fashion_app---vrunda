const CartService = require('../../services/cart.services');
const cartServices = new CartService();

exports.addToCart = async (req,res)=>{
    try {
        let cart = await cartServices.getCart({
            user: req.user._id,
            productId: req.body.productId,
            isDelete: false
        });
        // console.log(cart);
        if (cart) {
            cart.quantity += req.body.quantity;
            await cart.save();
            return res.json({message: "Cart Item already exist...", cart});
        };
        cart = await cartServices.addToCart({
             user: req.user._id, 
             ...req.body,
        });
     res.json({ message: "New Item is added to the cart", cart});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from cart controller"});
    }
};


exports.getCart = async(req,res)=>{
    try {
        let cart = await cartServices.getAllCart(req.query, req.user);
        console.log(cart);
        if (!cart) {
            return res.json({message: "Cart Item is not found..Please try again"});
        };
        return res.json({Cart: cart});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from cart controller"});
    }
};

exports.updateCart = async (req, res) => {
    try {
        let cart = await cartServices.getCart(req.query.cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Founded" });
        }
        cart = await cartServices.updateCart(
            { _id: cart._id },
            req.body,
            { new: true });
        res.status(202).json({ message: "Cart Updated SuccessFully", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.deleteCart = async (req, res) => {
    try {
        let cart = await cartServices.getCart({
            _id: req.query.cartId,
            isDelete: false
        });
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Founded" });
        }
        cart = await cartServices.updateCart(
            cart._id,
            { isDelete: true },
            { new: true });
        res.status(200).json({ message: "Cart Deleted SuccessFully", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};