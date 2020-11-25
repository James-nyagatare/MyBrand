import { Response } from "./response";
import Blog from "../models/blogModel";
import User from "../models/userModel";

export class DbValidator {
  static async findById(req, res) {
    try {
      const result = await Blog.findById(req.params.id);
      return result;
    } catch (error) {
      return Response.error(res, 404, "Blog Not Found");
    }
  }

  static async findOne(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      return user;
    } catch (error) {
      return Response.error(res, 500, "Something went wrong!");
    }
  }
}
