const express = require("express");
const router = express.Router();
const {
  generateNewShortURL,
  getAllUrls,
  getOriginalUrlbyShortid,
  getAnalystics,
} = require("../controllers/index");

router.post("/", generateNewShortURL);
router.get("/", getAllUrls);
router.get("/:shortId", getOriginalUrlbyShortid);
router.get("/analytics/:shortId", getAnalystics);

module.exports = router;
