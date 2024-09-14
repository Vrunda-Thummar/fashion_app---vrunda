const OrderServices = require('../../services/order.services');
const CartServices = require('../../services/cart.services');
const orderService = new OrderServices();
const cartServices = new CartServices();

exports.createOrder = async (req,res)=>{
    try {
        let cart = await cartServices.getAllCart(req.query, req.user);
        if (cart.length === 0) {
            return res.json({message: "Cart is not found..Please try again"});
        };
        // res.json(cart);
        let orderItems = cart  
        .map((item) => ({
            productId: item.productId._id,       
            quantity: item.quantity,       
            price: item.productId.productPrice,
            totalPrice : item.quantity * item.productId.productPrice
        }));
        // res.json(orderItems)
        let amount = orderItems.reduce((total, item) => total += item.totalPrice, 0);
        // res.json(amount)
        // console.log(amount);

        let order = await orderService.addToOrder({
            user:req.user._id,
            items: orderItems,
            totalAmount: amount
        });
        await cartServices.updatemanyCart(req.user._id);
        res.json({ message: "Order Succesfully Done", order});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from order user controller"});
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        let order = await orderService.findAllOrder({ user: req.user._id, isDelete: false });
        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        let order = await orderService.updateOrder(req.body.orderID, { isDelete: true });
        console.log(order);
        if (!order) {
            return res.json({ message: "Order is not found..." });
        };
        res.json({ message: "Order is Deleted Sucessfuly", order});
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error From DeleteOrder Controller" });
    }
};