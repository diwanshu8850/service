const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/plumber_data',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const plServiceSchema = new mongoose.Schema({
    name: String,
    price: String,
    text: String
});

const Pls = mongoose.model("Pls", plServiceSchema);

const plumberSchema = new mongoose.Schema({
    name: String,
    services: [plServiceSchema]
});
module.exports =  mongoose.model("Plumber", plumberSchema);



//Example to seed data
//Plumber.create({
//    name: "Basin-Sink",
//    services: [
//        {
//            name: "Waste Pipe",
//            price: "Rs. #",
//            text: "Includes All",
//            image:"../img/pigeon-install.jpg"
//        },
//        {
//            name: "Washbasin repair",
//            price: "Rs. #",
//            text: "Includes All"
//        },
//        {
//            name: "Wash Basin & Sink Installation",
//            price: "Rs. #",
//            text: "Doesn't includes Roof Drilling"
//        }
//    ]
//}, (err, item)=>{
//    if(err){
//        console.log(err);
//    }
//});

