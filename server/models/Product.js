const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    specialPrice: Number,
    currency: String,
    imgSrc:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);