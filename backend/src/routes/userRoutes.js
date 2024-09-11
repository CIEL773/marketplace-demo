const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.patch("/updatePassword/:id", userController.updatePassword);

router.patch("/updateCart/:id", userController.updateCart);

router.get("/getCart/:id", userController.getCart);

module.exports = router;

// User
// Signin post
// Signup post
// UpdateUser patch
// updateCart put
// getCart get
