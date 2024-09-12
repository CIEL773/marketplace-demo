const express = require("express");
const productControllers = require("../controllers/productController");
const router = express.Router();

router.get("/", productControllers.getProducts);
router.post("/createProduct", productControllers.createProduct);
router.put("/updateProduct/:id", productControllers.updateProduct);
router.get("/getProduct/:id", productControllers.getProduct);

module.exports = router;
// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
