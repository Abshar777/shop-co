import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://abshar:123@localhost:27017/', {
            dbName: 'shop-co',
            authSource: "admin",
        });

        console.log("MongoDB connected 🟢");
    } catch (err) {
        console.error("MongoDB connection error 🔴:", err);
        process.exit(1);
    }
};

export default connectDB;
