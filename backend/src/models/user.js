const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
  quantity: { type: Number, min: 1 },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "vendor"], default: "user" },
  password: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
  },  
  cart: { type: [cartSchema], default: [] },
  productList: {
    type: [{ type: Schema.Types.ObjectId, ref: "product" }],
    default: [],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
