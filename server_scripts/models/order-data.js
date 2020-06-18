const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/order_db',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const orderSchema = new mongoose.Schema({
    name: String,
    price: String,
    quantity: Number,
    email: String,
});

module.exports = mongoose.model('Order', orderSchema);