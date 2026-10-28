import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

export const connectTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  const systemBinary = 'C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe';
  process.env.MONGOMS_SYSTEM_BINARY = systemBinary;

  try {
    mongoServer = await MongoMemoryServer.create({
      binary: {
        systemBinary,
        skipMD5: true,
      },
    });
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  } catch (err) {
    // If MongoMemoryServer fails to launch child process in sandbox, connect to local fallback
    console.warn(`[TestSetup] Using local MongoDB fallback URI: ${err.message}`);
    const fallbackUri = process.env.TEST_MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsphere_test';
    await mongoose.connect(fallbackUri);
  }
};

export const clearTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
};

export const closeTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
};
