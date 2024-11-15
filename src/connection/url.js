// import dotenv from "dotenv"
// dotenv.config();
import mongoose from "mongoose";
import config from "../config/urls.js";
const connectToDB = async () => {
    try {
      await mongoose.connect(config.dbURI);
      console.log("Connected to MongoDB database successfully.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
export default connectToDB