const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to sign up. Please try again later." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      // Redirect to the blog page after successful login
      res.redirect("/api/blog");
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to log in. Please try again later." });
  }
});

module.exports = router;
