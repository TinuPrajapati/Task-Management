const multer = require("multer");
const { CloudinaryStorage } = require("@fluidjs/multer-cloudinary");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Task Manager",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});
const chat = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Task-Manager-Chat", // Optional: Folder for uploaded files in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "pdf"], // Optional: Restrict allowed file types
  },
});

const upload = multer({ storage });
const chatUpload = multer({ storage: chat });

module.exports = {upload,cloudinary,chatUpload};
