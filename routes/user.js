const express = require("express");
const router = express.Router();
const { userSignUp } = require("../controllers/user");

router.post("/", userSignUp);

module.exports = router;
