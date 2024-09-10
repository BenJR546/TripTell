const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }], // Ensure User model is included here
    });

    res.render("blog", {
      blogs: blogData.map((blog) => blog.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new blog
router.post("/blogs", async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
