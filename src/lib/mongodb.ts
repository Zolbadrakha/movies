import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const dbURI = 'mongodb://localhost:27017/movies';

    await mongoose.connect(dbURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
