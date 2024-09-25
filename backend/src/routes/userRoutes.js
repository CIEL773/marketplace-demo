const express = require("express");

const userController = require("../controllers/userController");
const {auth} = require("../middleware/authMiddleware")

const router = express.Router();


// router.get("/getUser/:id", userController.getUser);

// router.post("/signup", userController.signup);

// router.post("/signin", userController.signin);

// router.post("/signout", userController.signout);

// router.patch("/updatePassword/:id", userController.updatePassword);

// router.patch("/updateCart/:id", userController.updateCart);

// router.get("/getCart/:id", userController.getCart);

//public
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.get("/getUser", auth, userController.getUser);
router.patch("/updatePassword", auth, userController.updatePassword);
router.patch("/updateCart", auth, userController.updateCart);
router.get("/getCart", auth, userController.getCart);

router.post("/signout", userController.signout);
module.exports = router;

// User
// Signin post
// Signup post
// UpdateUser patch
// updateCart put
// getCart get
