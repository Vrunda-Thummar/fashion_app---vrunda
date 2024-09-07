require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT;

const server = express();

server.use(morgan('dev')) 
server.use(express.json()) 
server.use(express.urlencoded({ extended: false })) 

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


server.get('/', (req, res) => { 
    res.send("Welcome To Express Server...") 
}) 

server.use("/api/user", require('./routes/user.routes'));


// Start server
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
