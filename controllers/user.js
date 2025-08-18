const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth"); // Assuming you have an authService for additional logic

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.render("signup", { error: "User already exists" });

  await User.create({ name, email, password });
  return res.redirect("/"); // Redirect to home page after successful signUp
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(201).json(users);
};

const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.render("login", { error: "Invalid email or password" });

  const token = setUser(user);
  //console.log("User logged in:", getUser(sessionId));
  res.cookie("uid", token, {maxAge: 60 * 60 * 1000}); // Set session cookie and expires after 1 hour

  return res.redirect("/"); // Redirect to home page after successful login
};
module.exports = {
  userSignUp,
  getAllUsers,
  userLogIn,
};
