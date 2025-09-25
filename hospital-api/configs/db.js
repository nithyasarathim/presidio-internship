const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB atlas connection successful");
    }catch(err){
        console.log("MongoDB atlas connection failed -",err.message);
        process.exit(1);
    }
};

export default connectDB;