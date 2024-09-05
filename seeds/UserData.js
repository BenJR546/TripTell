const { User } = require("../models");

const userData = [
  {
    username: "traveler123",
    email: "traveler123@example.com",
    password: "password123",
  },
];

const seedUser = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;
