const mongoose = require('mongoose');
const Order = require('./order-data');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/user_data",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);