const express = require("express");
const app = express();
const PORT = 3001;
const urlRouter = require("./routes/url.js");
const { connectToMongoDB } = require("./dbConnection");
const URL = require("./models/url.js");
const path = require("path");
// DB connection
connectToMongoDB();

//Home Route
app.get("/", (req, res) => {
  req.name = "Mohammad Ali Zilani"; // adding stuff to request
  return res
    .status(200)
    .json({ message: `Welcome to the URL Shortener API made by ${req.name}` });
});
//SSR: Server Side Rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home");
});

//middlewares
app.use(express.json());
// ROUTES
app.use("/URL", urlRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
