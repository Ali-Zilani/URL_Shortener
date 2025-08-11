const express = require("express");
const app = express();
const PORT = 3001;
const urlRouter = require("./routes/url.js");
const { connectToMongoDB } = require("./dbConnection");
const path = require("path");
const staticRoute = require("./routes/staticRouter.js");
const userRoute = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly } = require("./middleware/auth.js");
// DB connection
connectToMongoDB();

//SSR: Server Side Rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ROUTES
app.use("/URL", restrictToLoggedInUserOnly, urlRouter);
app.use("/", staticRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
