const Product = require("../models/product");
const User = require("../models/user");

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

    //check if the user is a vendor
    const user = await User.findById(vendor);
    if (!user || user.role !== 'vendor'){
      return res.status(403).json({message: "Only Vendors can create new products."});
    }

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

    // add new product to vendor's productList
    user.productList.push(newProduct._id);
    await user.save();

    res.status(201).json({ message: "Success", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed", err: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, name, description, category, price, stock, imageUrl, vendor } = req.body;

    // check if the user the same user who created the product
    if(userId.toString() !== vendor.toString()){
      return res.status(403).json({message: "Only owner of the product can update it."});
    }

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

exports.getProductByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Vendor get all the products they put up.
    if(user.role !== 'vendor'){
      return res.status(403).json({message: "Only vendor can view their product list."});
    }


    const productList = user.productList;
    
    const products = await Promise.all(
      productList.map((productId) => Product.findById(productId).select('name stock imageUrl'))
    );
    //const products = await Product.find({ _id: { $in: productList } });
 
    // Only include name stock and image in products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get product', err });
  }
}

// Product
// CreateProduct post
// UpdateProduct put
// getProduct get
// getProductByUserId
