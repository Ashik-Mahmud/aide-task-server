const Product = require("../models/productModel");
const { UploadImage } = require("../utils/Cloudinary");

// create product
const createProduct = async (req, res) => {
  try {
    // destructure the request body
    const { name, ...others } = JSON.parse(req.body.data);

    // check if product already exists
    const productExists = await Product.findOne({ name }).exec();

    if (productExists) {
      return res.status(400).json({
        error: "Product already exists",
      });
    }
    // create new product
    const newProduct = new Product({
      name,
      ...others,
    });

    // get images from request
    if (req.file.path) {
      const image = await UploadImage(req.file.path, "products");
      newProduct.image = {
        url: image.secure_url,
        public_id: image.public_id,
      };
    }
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

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.status(200).json({
      products,
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
  getAllProducts,
};
