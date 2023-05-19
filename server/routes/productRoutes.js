const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.route("/").get(productsController.getProducts).patch(productsController.updateProduct);

module.exports = router;
