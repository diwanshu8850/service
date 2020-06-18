const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/user_data",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cartOrder = new mongoose.Schema({
    name: String,
    price: String,
    quantity: Number
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
         required:true,
        unique: true, // no two users can create two same emails
    },
    username: String,
    googleId: String,
    password: String,
    orders: [cartOrder]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);