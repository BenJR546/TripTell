const multer = require("multer");
const path = require("path");

//Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, //10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

//Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = upload;
