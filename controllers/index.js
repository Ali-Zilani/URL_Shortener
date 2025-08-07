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
  console.log("New short URL created:", shortID);
  return res.status(201).json({ id: shortID });
};

const getAllUrls = async (req, res) => {
  try {
    const urls = await URL.find({});
    if (!urls) return res.status(404).json({ error: "No URLs found" });
    return res.status(200).json(urls);
  } catch (err) {
    return res.status(501).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateNewShortURL,
  getAllUrls,
};
