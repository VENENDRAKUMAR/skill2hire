// lib/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ MongoDB connected");

    // 🔥 YE HAI MAGIC CODE - Index hatane ke liye
    const db = mongoose.connection.db;
    if (db) {
      const collections = await db.listCollections({ name: "users" }).toArray();
      if (collections.length > 0) {
        // Saare purane indexes jo model mein nahi hain unhe uda dega
        await mongoose.model("User").syncIndexes(); 
        console.log("🧹 Old indexes cleaned up!");
      }
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};