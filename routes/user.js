const express = require("express");
const router = express.Router();
const { userSignUp, getAllUsers } = require("../controllers/user");

router.post("/", userSignUp);
router.get("/", getAllUsers);

module.exports = router;
