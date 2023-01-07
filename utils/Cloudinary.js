var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* upload image instance */
const UploadImage = async (path, src) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: "/aide-task/" + src + "/",
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

/* delete image instance */
const DeleteImage = async (publicId, src) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      folder: "/aide-task/" + src + "/",
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { UploadImage, DeleteImage };
