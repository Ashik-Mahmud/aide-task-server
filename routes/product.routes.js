const router = require("express").Router();

// import controllers
const productController = require("../controllers/product.controller");

// import middleware
const AuthGuard = require("../middlewares/AuthGuard");
const upload = require("./../utils/Multer")


// @route POST api/product/create
// @desc create a product
// @access Private
router.post("/create", AuthGuard, upload.single('product'),  productController.createProduct);

// @route GET api/product/all
// @desc get all products
// @access secure
router.get("/all",  productController.getAllProducts);




// export
module.exports = router;