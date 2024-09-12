const withAuth = (req, res, next) => {
  console.log("withAuth middleware called");
  console.log("Session:", req.session);
  if (!req.session.user_id) {
    console.log("No user_id in session");
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("User authenticated");
  next();
};

module.exports = withAuth;
