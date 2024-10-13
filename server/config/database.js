const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING, {});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

// Export the connection
module.exports = { connectDB, mongooseConnection: mongoose.connection };
