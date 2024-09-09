const router = require('express').Router();
// Import route handlers
const userRoutes = require('./api/userRoutes');  // Adjust the path to your userRoutes file
const blogRoutes = require('./api/blogRoutes');  // Adjust the path to your blogRoutes file
const homeRoutes = require('./homeRoutes');       // Adjust the path to your homeRoutes file



// Use the routes
router.use('/', homeRoutes);   
router.use('/api/users', userRoutes);  
router.use('/api/blog', blogRoutes);   

module.exports = router;