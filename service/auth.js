const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const key = process.env.SECRET_KEY; 

const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, key);
}
const getUser = (token) => {
  if(!token) return null;
  return jwt.verify(token,key)
}
module.exports = {
  setUser,
  getUser
}