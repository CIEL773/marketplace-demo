const express = require("express");
const productControllers = require("../controllers/productController");
const router = express.Router();
const {auth} = require("../middleware/authMiddleware");

router.get("/", productControllers.getProducts);
router.post("/createProduct", auth, productControllers.createProduct);
router.put("/updateProduct/:id", auth, productControllers.updateProduct);
router.get("/getProduct/:id", productControllers.getProduct);
router.get("/getProductByUserId", auth, productControllers.getProductByUserId);

module.exports = router;
// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
