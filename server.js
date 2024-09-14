require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const path = require('path');
// const nodemailler = require('nodemailer');
// const OTPPass = require("./otp/otp");
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const Admin = require('./routes/admin/admin.routes');
const User = require('./routes/user/user.routes');
const userProduct = require('./routes/user/product.user.routes');
const adminProduct = require('./routes/admin/product.admin.routes');
const Wishlist = require('./routes/user/wishlist.user.routes');
const Cart = require('./routes/user/cart.user.routes');
const cartAdmin = require('./routes/admin/admin.routes');
const Order = require('./routes/user/order.user.routes');
const reviewRoutes = require("./routes/user/reviews.user.routes");



mongoose
  .connect(MONGO_URI)
  .then(console.log("Database connected"))
  .catch(err => console.log(err));


server.use(express.json());
server.use(express.urlencoded({extended: false}));


server.use('/api/admin', Admin);
server.use('/api/admin/product',adminProduct);
server.use('/api/admin/cart',cartAdmin);
server.use('/api/user', User);
server.use('/api/user/product',userProduct);
server.use('/api/user/wishlist',Wishlist);
server.use('/api/user/cart',Cart);
server.use('/api/user/cart/order',Order);
server.use("/api/review", reviewRoutes);


// //  node mailer
// const transporter = nodemailler.createTransport(
//   {
//       secure:true,
//       host:'smtp.gmail.com',
//       port:465,
//       auth:{
//           user:'thummarvrunda51@gmail.com',
//           pass:'jxlc yisl mawd drju'

//       }
//   }
// );

// function sendmail(to,sub,msg){
//   transporter.sendMail(
//       {
//           to:to,
//           sub:sub,
//           html:msg
//       });
//       console.log('email sent');
      
// }
// const generatedOTP = OTPPass(); 
// // const finalOTP =()=>{ 
// //   console.log(generatedOTP); 
// //   return generatedOTP; 
// // } 
// // module.exports = finalOTP; 
// sendmail('thummarvrunda51@gmail.com',"interview",`Hi There OTP is below ${generatedOTP}`)


server.listen(port, () => {
    console.log(`Server is start at http://localhost:${port}`);
});