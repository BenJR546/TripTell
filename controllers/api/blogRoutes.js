const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
      order: [["createdAt", "DESC"]], // Order by most recent first
    });

    res.render("blog", {
      blogs: blogData.map((blog) => blog.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve blogs" });
  }
});

// Route to create a new blog
router.post("/", withAuth, upload.single("image"), async (req, res) => {
  console.log("Received blog post request");
  console.log("Request body:", req.body);
  console.log("File:", req.file);

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      console.log("Missing title or content");
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
      console.log("Image URL:", image_url);
    }

    console.log("Creating new blog post");
    const newBlog = await Blog.create({
      title,
      content,
      image_url,
      user_id: req.session.user_id,
    });

    console.log("New blog created:", newBlog.id);

    const user = await User.findByPk(req.session.user_id);
    console.log("User found:", user.id);

    const blogWithUser = {
      ...newBlog.get({ plain: true }),
      user: {
        username: user.username,
      },
    };

    console.log("Sending response");
    return res.status(201).json(blogWithUser);
  } catch (err) {
    console.error("Server Error:", err);
    return res
      .status(500)
      .json({ message: "Failed to create blog post", error: err.message });
  }
});

module.exports = router;
