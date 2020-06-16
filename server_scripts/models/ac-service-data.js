const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ac_service_data',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const serviceSchema = new mongoose.Schema({
    name: String,
    price: String,
    text: String
});

const Acs = mongoose.model("Acs", serviceSchema);

const acSchema = new mongoose.Schema({
    name: String,
    services: [serviceSchema]
});
module.exports =  mongoose.model("Ac", acSchema);

    
//Example to seed data
//Ac.create({
//    name: "AC-Service-Repair",
//    services: [
//        {
//            name: "AC General Cleaning",
//            price: "Rs. #",
//            text: "Includes All",
//        },
//        {
//            name: "AC Deep Cleaning",
//            price: "Rs. #",
//            text: "Includes All"
//        },
//        {
//            name: "AC Repair & Service",
//            price: "Rs. #",
//            text: "Per Visit"
//        }
//    ]
//}, (err, item)=>{
//    if(err){
//        console.log(err);
//    }
//});
