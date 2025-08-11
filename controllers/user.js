const User = require("../models/User");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
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
  return res.redirect("/"); // Redirect to home page after successful login
};
module.exports = {
  userSignUp,
  getAllUsers,
  userLogIn,
};
