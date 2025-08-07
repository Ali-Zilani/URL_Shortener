const express = require("express");
const router = express.Router();
const { generateNewShortURL, getAllUrls } = require("../controllers/index");

router.post("/", generateNewShortURL);
router.get("/", getAllUrls);

module.exports = router;
