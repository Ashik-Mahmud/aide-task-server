const router = require('express').Router();

// import controllers
const userController = require('../controllers/user.controller');


// define routes
router.post('/register', userController.registerUser);



// export router
module.exports = router;