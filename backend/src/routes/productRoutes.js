const express = require("express");
const productControllers = require("../controllers/productController");
const router = express.Router();

router.get("/", productControllers.getProducts);
router.post("/createProduct", productControllers.createProduct);
router.put("/updateProduct/:userId", productControllers.updateProduct);
router.get("/getProduct/:id", productControllers.getProduct);
router.get("/getProductByUserId/:userId", productControllers.getProductByUserId);

module.exports = router;
// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
