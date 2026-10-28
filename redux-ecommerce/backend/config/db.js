import mongoose from 'mongoose';

/**
 * Connect to MongoDB using Mongoose.
 * Supports local MongoDB instances and MongoDB Atlas.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsphere';

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    // Mask credentials when logging host info
    const safeHost = conn.connection.host;
    console.log(`[MongoDB] Connected successfully to host: ${safeHost} (db: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // Do not terminate in test environment so tests can mock or use in-memory mongo
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[MongoDB] Server will continue running, but database operations will fail until MongoDB is available.');
    }
    return null;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('[MongoDB] Connection closed.');
  } catch (error) {
    console.error(`[MongoDB] Error closing connection: ${error.message}`);
  }
};

