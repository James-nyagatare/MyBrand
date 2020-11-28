import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DbValidator } from "../helpers/dbvalidator";
import { Response } from "../helpers/response";
import User from "../models/userModel";
import { JWT_KEY } from "../config/env";
import { uploadToCloud } from "../config/cloudinary";

export class UserController {
  static async registerUser(req, res) {
    try {
      const checkUser = await DbValidator.findOne(req, res);
      if (checkUser) return Response.error(res, 409, "User already registered");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const { _id, name, email } = await User.create(req.body);
      return Response.success(res, 201, "User sucessfully created", {
        _id,
        name,
        email,
      });
    } catch (err) {
      return Response.error(res, 500, "Something went Wrong");
    }
  }

  static async loginUser(req, res) {
    try {
      const user = await DbValidator.findOne(req, res);
      if (!user) return Response.error(res, 400, "Invalid email or password");
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return Response.error(res, 401, "Invalid email or password");
      const { _id, name, email } = user;
      const token = jwt.sign({ _id, name, email }, JWT_KEY);
      return Response.success(res, 200, "sucessfully logged in", token);
    } catch (error) {
      return Response.error(res, 500, "Something went wrong");
    }
  }

  static async updateProfilePicture(req, res) {
    try {
      if (!req.file)
        return Response.error(res, 400, "Profile image is required");
      if (req.params.id !== req.user._id)
        return Response.error(res, 403, "Access Denied!");
      const img = await uploadToCloud(req.file, res);
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return Response.error(res, 404, "User not found");
      user.profileImage = img.url;
      user.save();
      return Response.success(res, 200, user);
    } catch (error) {
      return Response.error(res, 500, "Something went wrong");
    }
  }
}
