const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/reviews_data",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const reviewSchema = new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model("Review", reviewSchema);