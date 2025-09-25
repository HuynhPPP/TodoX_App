import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log("Connected to MongoDB failed");
        process.exit(1);
    }
}