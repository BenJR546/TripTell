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
    console.log("Getting all blogs ======================");
    const blogData = await Blog.findAll({
      include: [{ model: User }],
      order: [["createdAt", "DESC"]], // Order by most recent first
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log("blogs", blogs);

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

router.post("/like", withAuth, async (req, res) => {
  try {
    const { blog_id } = req.body;
    console.log("Liking blog:", blog_id);

    const blog = await Blog.findByPk(blog_id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.likes += 1;
    await blog.save();

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ message: "Failed to like blog post" });
  }
});

router.post("/dislike", withAuth, async (req, res) => {
  try {
    const { blog_id } = req.body;
    console.log("Disliking blog:", blog_id);

    const blog = await Blog.findByPk(blog_id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.dislikes += 1;
    await blog.save();

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ message: "Failed to dislike blog post" });
  }
});

module.exports = router;
