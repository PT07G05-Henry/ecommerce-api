require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
  secure: true,
});

const uploadImage = async function (filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "ecommerce",
  });
};

// elimina archivo de la nube

const deleteImageCloud = async function (publicId) {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImage, deleteImageCloud };
