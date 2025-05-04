import { config } from "dotenv";
import mongoose from "mongoose";
config();
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://abshar:123@localhost:27017/';
        await mongoose.connect(mongoURI, {
            dbName: 'shop-co',
            authSource: "admin",
        });

        console.log("MongoDB connected 🟢 to ", mongoURI);
    } catch (err) {
        console.error("MongoDB connection error 🔴:", err);
        process.exit(1);
    }
};

export default connectDB;
