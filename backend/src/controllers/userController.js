const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../jwt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.resetPassword = async (req, res) => {
  try {
    const {email} = req.body;

    const user = await User.findOne({email});
    if (!user){
      return res.status(404).json({message: "User not found"});
    }

    const defaultPassword = "111111";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    user.password = hashedPassword;
    await user.save();

    const msg = {
      to: user.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Your Password has been Reset!",
      text: `Hello ${user.name}. Your password has been reset to ${defaultPassword}. Please update it on your User Info page after log in`,
    }

    await sgMail.send(msg);

    res.status(200).json({ message: "Password has been reset and an email has been sent." });
  }catch (err) {
    res.status(500).json({ message: "Failed to reset password", err });
  }
}

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user", err });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "success", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//returns a token
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "password is incorrect" });
    }

    const token = jwt.generateToken(user); //generate token

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // avatar: user.avatar || ""
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.signout = (req, res) => {
  try {
    res.status(200).json({ message: "Signout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatePassword = await User.findByIdAndUpdate(
      userId,
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

// exports.updateCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const updatedItem = req.body; // {productId, quantity}

//     if (!updatedItem.productId || !updatedItem.quantity) {
//       return res.status(400).json({ message: "Product ID and quantity are required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // updatedProductIndex: index of the product in the cart
//     const updatedProductIndex = user.cart.findIndex((cartItem) => {
//       return cartItem.productId.toString() === updatedItem.productId.toString();
//     });

//     // Update quantity
//     if (updatedProductIndex > -1) {
//       user.cart[updatedProductIndex].quantity = updatedItem.quantity;
//     }
//     // Add new product
//     else {
//       user.cart.push({
//         productId: updatedItem.productId,
//         quantity: updatedItem.quantity,
//       });
//     }
//     await user.save();
//     res.status(200).json({ cart: user.cart });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

exports.updateCart = async (req, res) => {
  console.log("updateCart route hit");
  try {
    console.log("Updated item received from frontend:", req.body);
    const userId = req.user.id;
    const updatedItem = req.body; // {productId, quantity}


    if (!updatedItem.productId || typeof updatedItem.quantity !== 'number') {
      return res.status(400).json({ message: "Product ID and quantity are required" }); 
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // updatedProductIndex: index of the product in the cart
    const updatedProductIndex = user.cart.findIndex((cartItem) => {
      return cartItem.productId.toString() === updatedItem.productId.toString();
    });
    // Delete product if quantity is 0
    if (updatedProductIndex > -1 && updatedItem.quantity <= 0) {
      user.cart.splice(updatedProductIndex, 1);
    }
    // Update quantity
    else if (updatedProductIndex > -1) {
      user.cart[updatedProductIndex].quantity = updatedItem.quantity;
    }
    // Add new product
    else {
      user.cart.push({
        productId: updatedItem.productId,
        quantity: updatedItem.quantity,
      });
    }

    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.cart.length === 0)
      return res.status(200).json({ message: "No item in the cart." });
    else {
      res.status(200).json(user.cart);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
