const multer = require("multer");
const path = require("path");
const cloudinary = require('../../config/cloudinary.config');
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "LandingPageBuilder"
  }
})

// Multer config
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".png" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".svg"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
