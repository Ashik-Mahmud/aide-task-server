const router = require('express').Router();

// import controllers
const userController = require('../controllers/user.controller');


// import middleware
const upload = require('../utils/Multer');
const AuthGuard = require('../middlewares/AuthGuard');



// @route POST api/user/register
// @desc Register user
// @access Public
router.post('/register', upload.single('avatar'), userController.registerUser);


// @route POST api/user/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', userController.loginUser);

// @route GET api/user/all
// @desc Get all users
// @access Public
router.get('/all', AuthGuard, userController.getAllUsers);

// @route GET api/user/update/:id
// @desc Update user
// @access secret
router.post('/update/:id', AuthGuard, upload.single('avatar'), userController.updateUser);


// @route GET api/user/:id
// @desc Get user by id
// @access secret
router.get('/:id', AuthGuard, userController.getUserById);


// export router
module.exports = router;