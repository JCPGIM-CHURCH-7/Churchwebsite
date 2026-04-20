import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Attempting to connect to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI as string, opts)
      .then((mongoose) => {
        console.log('Successfully connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB initial connection error:', error.message);
        if (error.message.includes('auth')) {
          console.error('CREDENTIALS ERROR: Please check the username and password in .env.local');
        }
        throw error;
      });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    console.error('MongoDB connection wait error:', e.message);
    throw e;
  }
  
  return cached.conn;
}

export default connectToDatabase;
