import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const MONGO_CONN_STRING = process.env.MONGO_URL;
        await mongoose.connect(MONGO_CONN_STRING);
        console.log("MongoDB atlas connection successful");
    }catch(err){
        console.log("MongoDB atlas connection failed -",err.message);
        process.exit(1);
    }
};

export default connectDB;