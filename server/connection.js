const mongoose = require("mongoose")

const URI = process.env.MONGO_URI;

const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Connection Success");
    } catch (error) {
        console.error("DB connection failed");
        process.exit(0);
    }
}


module.exports = connectDB;