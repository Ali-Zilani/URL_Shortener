const express = require("express");
const router = express.Router();
const {
  generateNewShortURL,
  getAllUrls,
  getOriginalUrlbyShortid,
} = require("../controllers/index");

router.post("/", generateNewShortURL);
router.get("/", getAllUrls);
router.get("/:shortId", getOriginalUrlbyShortid);

module.exports = router;
