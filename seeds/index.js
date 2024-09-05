const sequelize = require("../config/connection");
const seedUser = require("./galleryData");
const seedBlogPosts = require("./paintingData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlogPosts();

  process.exit(0);
};

seedAll();
