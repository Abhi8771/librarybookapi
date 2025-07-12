import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const Connection = async () => {
    
    try {
      await  mongoose.connect(process.env.URI)
    console.log("Connected")
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

Connection()