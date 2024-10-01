const express = require("express");

const userController = require("../controllers/userController");
const {auth} = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.get("/getUser", auth, userController.getUser);
router.patch("/updatePassword", auth, userController.updatePassword);
router.patch("/updateCart", auth, userController.updateCart);
router.get("/getCart", auth, userController.getCart);
router.post("/resetPassword", userController.resetPassword);

router.post("/signout", userController.signout);
module.exports = router;

