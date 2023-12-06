const mongoose = require('mongoose');

const connectionDatabase = async() =>{
    try{
        mongoose.connect("mongodb+srv://abdullajust2021:CA202-node@cluster0.xjusnsf.mongodb.net/?retryWrites=true&w=majority");

        console.log("Successflly connected To MongoDb")
    }catch(error){
        console.log("NOT CONNECTED:- ", error)
    }
}

module.exports = connectionDatabase