const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const updateProduct = async (req, res) => {
  const { id, name, specialPrice, price, currency } = req.body;
  console.log(id);

  console.log(req.body.name);
  const product = await Product.findById(id).exec();
  product.name = name;

  product.specialPrice = specialPrice;
  product.price = price;
  product.currency = currency;

  const updatedProduct = await product.save();

  res.json(` Product with ID '${product._id}' updated`);
};

module.exports = { createProduct, getProducts, updateProduct };
