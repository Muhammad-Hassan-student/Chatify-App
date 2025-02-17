import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo db is connect to host" + conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
