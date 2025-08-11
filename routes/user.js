const express = require("express");
const router = express.Router();
const { getAllUsers, userSignUp, userLogIn } = require("../controllers/user");

router.post("/", userSignUp);
router.get("/", getAllUsers);
router.post("/login", userLogIn);

module.exports = router;
