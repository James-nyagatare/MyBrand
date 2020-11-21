const { v2: cloudinary } = require("cloudinary");
const env = require("./env");

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

const uploadToCloud = async (file) => {
  const image = await cloudinary.uploader.upload(file.path, {
    folder: "MyBrand",
    use_filename: true,
  });
  return image;
};

module.exports = uploadToCloud;
