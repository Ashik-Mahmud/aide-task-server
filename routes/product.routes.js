const router = require("express").Router();

// import controllers
const productController = require("../controllers/product.controller");

// import middleware
const AuthGuard = require("../middlewares/AuthGuard");


// @route POST api/product/create
// @desc create a product
// @access Private
router.post("/create", AuthGuard, productController.createProduct);