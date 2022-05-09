const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
    min: 0,
  },
  catergory: {
    type: "String",
    lowercase: true,
    enum: ["vegetable", "fruit", "dairy"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
