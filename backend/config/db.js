const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected Successfully");
    } catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
