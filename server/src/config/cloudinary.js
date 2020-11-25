import { v2 as cloudinary } from "cloudinary";
import { Response } from "../helpers/response";
import { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } from "./env";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const uploadToCloud = async (file, res) => {
  try {
    const image = await cloudinary.uploader.upload(file.path, {
      folder: "MyBrand",
      use_filename: true,
    });
    return image;
  } catch (error) {
    return Response.error(res, 500, error);
  }
};
