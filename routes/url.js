const express = require("express");
const router = express.Router();
const {
  generateNewShortURL,
  getAllUrls,
  getOriginalUrlbyShortid,
  getAnalystics,
} = require("../controllers/url");

router.route("/").get(getAllUrls).post(generateNewShortURL);
router.get("/:shortId", getOriginalUrlbyShortid);
router.get("/analytics/:shortId", getAnalystics);

module.exports = router;
