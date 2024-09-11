const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, imageUrl, vendor } =
      req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      stock,
      imageUrl,
      vendor,
    });

    await newProduct.save();
    res.status(201).json({ message: "Success", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed", err: err.message });
  }
};

exports.updateProduct = async (req, res) => {};

exports.getProduct = async (req, res) => {};

// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
