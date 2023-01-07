const Product = require("../models/productModel");

// product by id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};
