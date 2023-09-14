const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.info('DB has been connected');
  } catch (error) {
    console.info('DB  connection failed', error.message);
  }
};

module.exports = connectDB;
