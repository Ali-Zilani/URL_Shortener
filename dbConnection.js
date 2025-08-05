const mongoose = require("mongoose");
import "dotenv/config";

const DB_url = process.env.db_url;

const connectToMongoDB = async () => {
  return mongoose
    .connection(DB_url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(`Error in connecting to DB ${err}`);
    });
};

module.exports = {
  connectToMongoDB,
};
