// import dotenv from "dotenv"
// dotenv.config();
import mongoose from "mongoose";
const connectToDB = async (url) => {
    try {
      const db = await mongoose.connect(url);
      console.log("Connected to MongoDB database successfully.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
export default connectToDB