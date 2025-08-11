const URL = require("../models/url");
const shortid = require("shortid");

const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  try {
    // Check if URL already exists
    const existingEntry = await URL.findOne({ redirectURL: body.url });

    if (existingEntry) {
      return res.status(200).json({
        message: "URL already exists",
        id: existingEntry.shortId,
      });
    }

    // Correct usage of shortid.generate()
    const shortID = shortid.generate().slice(0, 8);

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    // If rendering a view with 'id', fix typo in variable name too
    return res.render("home", { id: shortID }); // note: was 'shotID' typo
    // Or return JSON:
    // return res.status(201).json({ id: shortID });
  } catch (err) {
    console.error("Error creating short URL:", err);
    return res.status(500).json({ message: `Error ${err}` });
  }
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

const getOriginalUrlbyShortid = async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) return res.status(400).json({ error: "Short ID is required" });

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: new Date() } } },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ error: "Original URL not found" });
    }

    let redirectUrl = entry.redirectURL;
    // Prepend https:// if missing
    if (!redirectUrl.match(/^https?:\/\//i)) {
      redirectUrl = `https://${redirectUrl}`;
    }

    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("Error redirecting:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAnalystics = async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) return res.status(400).json({ error: "Short ID is required" });
  try {
    const entry = await URL.findOne({ shortId });
    if (!entry) return res.status(404).json({ error: "Short URL not found" });
    const analytics = {
      shortId: entry.shortId,
      redirectURL: entry.redirectURL,
      visitCount: entry.visitHistory.length,
      visitHistory: entry.visitHistory,
    };
    return res.status(200).json(analytics);
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error ${err}` });
  }
};
module.exports = {
  generateNewShortURL,
  getAllUrls,
  getOriginalUrlbyShortid,
  getAnalystics,
};
