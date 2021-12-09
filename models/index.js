import mongoose from 'mongoose';

import User from './User.js';
import Post from './Post.js';
import Profile from './Profile.js';

// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

const models = { User, Post, Profile };

export { connectDB };

export default models;
