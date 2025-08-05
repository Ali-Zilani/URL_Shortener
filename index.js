const express = require("express");
const app = express();
const PORT = 3001;
const urlRouter = requie("./routes/url.js");
const { connectToMongoDB } = require("./dbConnection");

//DB connection
connectToMongoDB();

// ROUTES
app.use("/URL", urlRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
