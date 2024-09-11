const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "success", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "password is incorrect" });
    }

    res.status(200).json({ message: "signin succeed" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword);
    const updatePassword = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatePassword) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.params.id;
    if (!Array.isArray(cartItems))
      return res.status(400).json({ message: "Should be an array" });
    const user = await User.findById(userId);

    cartItems.forEach((item) => {
      const productId = user.cart.findIndex((cartItem) => {
        cartItem.productId.toString() === item.productId;
      });
      //update quantity
      if (productId > -1) {
        user.cart[productId].quantity = item.quantity;
      }
      //add new product
      else {
        user.cart.push({
          productId: item.productId,
          quantity: item.quantity,
        });
      }
    });
    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user.cart.length === 0)
      return res.status(200).json({ message: "No item in the cart." });
    else {
      res.status(200).json({ cart: user.cart });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
