import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB with local
const dbUri: string = process.env.MONGODB_URI || 'mongodb+srv://amalfrancis744:amal2023@cluster0.7rxwgrn.mongodb.net/';

// db connection
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