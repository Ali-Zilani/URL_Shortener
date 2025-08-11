const User = require("../models/User");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.render("home");
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(201).json(users);
};

module.exports = {
  userSignUp,
  getAllUsers,
};
