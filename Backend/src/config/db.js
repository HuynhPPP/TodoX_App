import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Log để debug
        console.log("Attempting to connect to MongoDB...");
        console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
        console.log("MONGODB_URI length:", process.env.MONGODB_URI?.length || 0);
        
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not set");
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Connected to MongoDB failed");
        console.error("Error details:", error.message);
        console.error("Full error:", error);
        process.exit(1);
    }
}