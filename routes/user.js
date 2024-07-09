const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const { authenticateToken, authenticateAdminToken } = require('../middleware/auth')

// const User = require('../models/user');

// User Registration

router.post('/signup',userController.signUp)

// User Login
router.post('/login',userController.login);

//user detail
router.get('/details',authenticateToken,userController.details);

//update detail
router.put('/updates',authenticateToken,userController.updateDetails);

//delete details

router.delete('/delete/:id',authenticateAdminToken,userController.deleteUser);





module.exports = router;