const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  stock: { type: Number, min: 0, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'user' }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;