const express = require('express');
const router = express.Router();
const { 
  getMenuItems, 
  getMenuItemById, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', getMenuItems);

// @route   GET /api/menu/:id
// @desc    Get menu item by ID
// @access  Public
router.get('/:id', getMenuItemById);

// @route   POST /api/menu
// @desc    Create a menu item
// @access  Private/Admin
router.post('/', protect, admin, createMenuItem);

// @route   PUT /api/menu/:id
// @desc    Update a menu item
// @access  Private/Admin
router.put('/:id', protect, admin, updateMenuItem);

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;
