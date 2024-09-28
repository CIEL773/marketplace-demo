const express = require("express");
const productControllers = require("../controllers/productController");
const router = express.Router();
const {auth} = require("../middleware/authMiddleware");

router.get("/", productControllers.getProducts);
router.post("/createProduct", auth, productControllers.createProduct);
router.put("/updateProduct/:id", auth, productControllers.updateProduct);
router.get("/getProduct/:id", productControllers.getProduct);
router.get("/getProductByUserId", auth, productControllers.getProductByUserId);
router.get("/search", productControllers.searchProducts);

module.exports = router;
