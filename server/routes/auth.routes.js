const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController.js");
const OrderController = require("../controllers/orderController.js");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/logout", AuthController.logout);

router.get("/user", AuthController.getUser);

router.put('/update-user',AuthController.updateUserProfile);

router.post('/order',OrderController.createOrder);

router.get('/orders/:userId',OrderController.getOrdersByUserId)

module.exports = router;
