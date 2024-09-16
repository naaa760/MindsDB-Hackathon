import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()


const MONGO_URI: string = process.env.MONGODB_URI || "mongo://localhost/27017/healthpulse"

export const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Successfully Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('Successfully disconnected from MongoDB!')
  } catch (error) {
    console.error('Error disconnectin from MongoDB', error)
  }
}
