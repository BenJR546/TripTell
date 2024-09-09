const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./BlogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed Users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed Blogs
    const blogs = await Blog.bulkCreate(blogData, {
      returning: true,
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1);
  }
};

seedDatabase();