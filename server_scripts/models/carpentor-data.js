const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/carpentor_data',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const crServiceSchema = new mongoose.Schema({
    name: String,
    price: String,
    text: String
});

const Crs = mongoose.model("Crs", crServiceSchema);

const carpentorSchema = new mongoose.Schema({
    name: String,
    services: [crServiceSchema]
});
module.exports =  mongoose.model("Carpentor", carpentorSchema);



//Example to seed data
//Carpentor.create({
//    name: "Balcony",
//    services: [
//        {
//            name: "Pigeon Net Installation",
//            price: "Rs. #",
//            text: "Rs. # for every square feet.",
//            image:"../img/pigeon-install.jpg"
//        },
//        {
//            name: "Clothes Ceiling Hanger Installation",
//            price: "Rs. #",
//            text: "Includes Roof Drilling"
//        },
//        {
//            name: "Clothes Wall Hanger Installation",
//            price: "Rs. #",
//            text: "Doesn't includes Roof Drilling"
//        }
//    ]
//}, (err, item)=>{
//    if(err){
//        console.log(err);
//    }
//});
//
//Carpentor.create({
//    name: "Bed",
//            services: [
//                {
//                    name: "Bed Support Repair",
//                    price: "Rs. #",
//                    text: "Includes whole support repair"
//                },
//                {
//                    name: "Bed Legs/Headboard Repair",
//                    price: "Rs. #",
//                    text: "Includes repair of either single leg or headboard"
//                }
//            ]
//}, (err, item)=>{
//    if(err){
//        console.log(err);
//    }
//});
//
//Carpentor.create({
//    name: "Cupboard-Drawer",
//            services: [
//                {
//                    name: "Cubboard Hinge",
//                    price: "Rs. #",
//                    text: "Installation/Repair"
//                },
//                {
//                    name: "Channel Repair",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Channel Replacement",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Handle Replacement",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Lock Installation",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Lock Replacement",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Lock Repair",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Sliding Door Repair",
//                    price: "Rs. #",
//                    text: "Includes all"
//                },
//                {
//                    name: "Shelf Installation",
//                    price: "Rs. #",
//                    text: "Wooden/Glass Shelf Installation using clamps"
//                }
//                
//            ]
//}, (err, item)=>{
//    if(err){
//        console.log(err);
//    }
//});
//
//Carpentor.create({
//    name: "Door",
//            services: [
//                {
//                    name: "Accessory Installation",
//                    price: "Rs. #",
//                    text: "Any one of Latch,Chain,Stopper,Magnet"
//                },
//                {
//                    name: "Door Installation",
//                    price: "Rs. #",
//                    text: "For Wooden Doors Only"
//                }
//            ]
//}, (err, item)=>{
//    if(err){
//        console.log(err);
//    }
//});