const Product = require("../models/productModel");

// create product
const createProduct = async (req, res) => {
  try {
    // destructure the request body
    const { title, description, price, category, quantity, images } = req.body;

    // check if product already exists
    const productExists = await Product.findOne({ title }).exec();

    if (productExists) {
      return res.status(400).json({
        error: "Product already exists",
      });
    }

    // create new product
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      quantity,
      images,
      postedBy: req.user._id,
    });

    // save product to database
    const savedProduct = await newProduct.save();

    // return response
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};


module.exports = {
    createProduct,
};