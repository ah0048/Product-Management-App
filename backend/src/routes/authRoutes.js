const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const registerSchema = require('../validations/registerSchema');
const loginSchema = require('../validations/loginSchema'); // Create this schema for login validation

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser); // Validate before calling controller
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;
