const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/users/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

module.exports = router;
