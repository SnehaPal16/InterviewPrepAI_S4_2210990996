const mongoose = require("mongoose");

const connectDB = async(req , res) => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("DATABASE CONNECTED");
    }
    catch(error){
        console.log("Error Connecting To MongoDB : ", error);
        process.exit(1);
    }
}

module.export = connectDB;