const sequelize = require("../config/connection");
const seedUser = require("./UserData");
const seedBlogPosts = require("./BlogPostData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlogPosts();

  process.exit(0);
};

seedAll();
