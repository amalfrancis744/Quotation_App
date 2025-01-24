import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dbUri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/quotation-app';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;