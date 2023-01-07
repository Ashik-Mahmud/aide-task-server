const router = require('express').Router();

// import controllers
const userController = require('../controllers/user.controller');
const upload = require('../utils/Multer');



// @route POST api/user/register
// @desc Register user
// @access Public
router.post('/register', upload.single('avatar'), userController.registerUser);


// @route POST api/user/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', userController.loginUser);


// export router
module.exports = router;