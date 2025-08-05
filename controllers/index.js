const URL = require("../models/url");
const { nanoid } = require("nanoid");

const generateNewShortURL = async (req, res) => {
  return res.send(`new short url is ${nanoid(10)}`);
};

module.exports = {
  generateNewShortURL,
};
