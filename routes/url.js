const express = require("express");
const router = express.Router();
const { generateNewShortURL } = require("../controllers/index");

router.post("/", generateNewShortURL);

module.exports = router;
