const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/productController.js");

router.get("/product/:id", ProductController.getProduct);
router.get("/products", ProductController.getProducts);
router.get("/categories", ProductController.getCategories);
router.get("/sizes", ProductController.getSizes);

module.exports = router;
