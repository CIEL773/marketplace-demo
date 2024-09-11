const express = require("express");

const productControllers = require("../controllers/productController");

const router = express.Router();

router.post("/createProduct", productControllers.createProduct);

router.put("/updateProduct", productControllers.updateProduct);

router.get("/getProduct", productControllers.getProduct);

// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
