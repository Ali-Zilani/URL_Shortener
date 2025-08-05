const express = require("express");
const app = express();
const PORT = 3001;
const urlRouter = require("./routes/url.js");
const { connectToMongoDB } = require("./dbConnection");

// DB connection
connectToMongoDB();

// ROUTES
app.use("/URL", urlRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
