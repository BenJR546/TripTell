const express = require('express');
const router = express.Router();

// Import route handlers
const userRoutes = require('./api/userRoutes');  // Adjust the path to your userRoutes file
const blogRoutes = require('./api/blogRoutes');  // Adjust the path to your blogRoutes file
const homeRoutes = require('./homeRoutes');       // Adjust the path to your homeRoutes file

// Use the routes
router.use('/api/users', userRoutes);  // Prefix for user routes
router.use('/api/blog', blogRoutes);  // Prefix for blog routes
router.use('/', homeRoutes);           // Home page and login/signup routes

module.exports = router;

