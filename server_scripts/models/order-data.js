const mongoose = require('mongoose');
const User = require('./user_database');

mongoose.connect('mongodb://localhost/order_db',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const orderSchema = new mongoose.Schema({
    name: String,
    price: String,
    quantity: Number
});

module.exports = mongoose.model('Order', orderSchema);