const express = require("express");
const app = express();
const PORT = 3001;
const urlRouter = require("./routes/url.js");
const { connectToMongoDB } = require("./dbConnection");

// DB connection
connectToMongoDB();

//Home Route
app.use("/", (req, res) => {
  req.name = "Mohammad Ali Zilani"; // adding stuff to request
  return res
    .status(200)
    .json({ message: `Welcome to the URL Shortener API made by ${req.name}` });
});

// ROUTES
app.use("/URL", urlRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
