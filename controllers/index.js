const URL = require("../models/url");
const shortid = require("shortid");

const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = shortid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(201).json({ id: shortID });
};

module.exports = {
  generateNewShortURL,
};
