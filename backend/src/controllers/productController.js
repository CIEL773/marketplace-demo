const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
}

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

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, category, price, stock, imageUrl, vendor } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        category,
        price,
        stock,
        imageUrl,
        vendor
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', err });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get product', err });
  }
};

// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
