//const Sequelize = require('sequelize');
//const sequelize = require('../config/connection');

// Import all models
const User = require('./User');
const Blog = require('./Blog');

// Define model relationships
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // If a user is deleted, their blog posts will also be deleted
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

// Export the models
module.exports = {
  User,
  Blog,
};