const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController.js");
const OrderController = require("../controllers/orderController.js");

router.post("/add-category", ProductController.addCategory);
router.post("/add-product", ProductController.addProduct);
router.post("/add-size", ProductController.addSize);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.get('/orders',OrderController.getAllOrders);
router.put('/update-order-status',OrderController.updateOrderStatus);

module.exports = router;
