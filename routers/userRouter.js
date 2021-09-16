const express = require("express");
const {
  loginUser,
  registerUser,
  getUserInfo,
} = require("../controller/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

router.route("/info").get(protect, getUserInfo);

module.exports = router;
