const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/getUser", userController.getUser);

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.patch("/updatePassword/:id", userController.updatePassword);

router.patch("/updateCart", userController.updateCart);

router.get("/getCart", userController.getCart);

module.exports = router;

// User
// Signin post
// Signup post
// UpdateUser patch
// updateCart put
// getCart get
