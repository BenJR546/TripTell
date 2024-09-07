const { Blog } = require("../models");

const blogPostData = [
  {
    title: "My Amazing Trip to Rome",
    content:
      "I spent a week exploring the ancient ruins and enjoying delicious pasta in Rome. The Colosseum was breathtaking!",
    city: "Rome",
    country: "Italy",
    date: "2023-05-15",
    user_id: 1,
  },
  {
    title: "Paris: City of Lights",
    content:
      "From the Eiffel Tower to the Louvre, Paris never disappoints. The croissants were to die for!",
    city: "Paris",
    country: "France",
    date: "2023-07-22",
    user_id: 1,
  },
  {
    title: "Tokyo Adventures",
    content:
      "Exploring the bustling streets of Tokyo was an unforgettable experience. The blend of tradition and technology is fascinating.",
    city: "Tokyo",
    country: "Japan",
    date: "2023-09-10",
    user_id: 1,
  },
  {
    title: "Magical Marrakech",
    content:
      "The colors, scents, and sounds of Marrakechs medina were overwhelming in the best way possible. Cant wait to return!",
    city: "Marrakech",
    country: "Morocco",
    date: "2023-11-05",
    user_id: 1,
  },
  {
    title: "Winter Wonderland in Reykjavik",
    content:
      "Watching the Northern Lights dance across the sky in Reykjavik was a dream come true. Icelands landscapes are out of this world.",
    city: "Reykjavik",
    country: "Iceland",
    date: "2024-01-18",
    user_id: 1,
  },
];
//testing
const seedBlogPosts = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPosts;
