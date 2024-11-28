const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController.js");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/logout", AuthController.logout);

router.get("/user", AuthController.getUser);

router.put('/update-user',AuthController.updateUserProfile)

module.exports = router;
