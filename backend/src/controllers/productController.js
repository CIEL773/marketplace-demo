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
    //Original: Get from req.body
    // const { name, description, category, price, stock, imageUrl, vendor } =
    //   req.body;
    // 
    // const user = await User.findById(vendor);

    //Updated: get VendorId from token
    const {name, description, category, price, stock, imageUrl} = req.body;
    const vendorId = req.user.id;

    //check if the user is a vendor
    const user = await User.findById(vendorId);
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
      vendor: vendorId,
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
    const productId = req.params.id;
    const userId = req.user.id;
    const { name, description, category, price, stock, imageUrl, vendor } = req.body;

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
    // const userId = req.params.userId;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Vendor get all the products they put up.
    if(user.role !== 'vendor'){
      return res.status(403).json({message: "Only vendor can view their product list."});
    }


    const productList = user.productList;
    
    // Original:
    // v1
    // const products = await Promise.all(
    //   productList.map((productId) => Product.findById(productId).select('name stock imageUrl'))
    // );
    // v2
    //const products = await Product.find({ _id: { $in: productList } });

    //Updated:
    const products = await Product.find({vendor: userId}).select('name stock imageUrl');
    // Only include name stock and image in products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get product', err });
  }
}

exports.searchProducts = async (req, res) => {
  const query = req.query.query;
  // console.log(query);
  try {
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const products = await Product.find({ name: new RegExp(query, 'i') });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: "Error occurred during search." });
  }
}
