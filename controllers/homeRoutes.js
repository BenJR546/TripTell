// homeroute.js

const router = require("express").Router();
const { Blog, User } = require("../models");

// Route to render the home page
router.get("/", (req, res) => {
  res.render("home", {
    loggedIn: req.session.loggedIn,
  });
});

// Route to render the blog page
// homeroute.js or similar
router.get("/blog", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("blog", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  // if (req.session.loggedIn) {
  // res.redirect("/");
  //   return;
  // }
  res.render("signup");
});

module.exports = router;
