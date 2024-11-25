const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController.js");

router.post("/add-category", ProductController.addCategory);
router.post("/add-product", ProductController.addProduct);
router.post("/add-size", ProductController.addSize);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.put("/update-product/:id", ProductController.updateProduct);

module.exports = router;
