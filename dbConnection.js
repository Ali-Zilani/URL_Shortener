const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const DB_url = process.env.db_url;
const connectToMongoDB = async () => {
  return mongoose
    .connect(DB_url)
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
