import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env";
import { Response } from "../helpers/response";

export class AuthMiddleware {
  static adminAuth(req, res, next) {
    const token = req.header("token");
    if (!token)
      return Response.error(res, 401, "Access denied. no token provided ");
    try {
      const payload = jwt.verify(token, JWT_KEY);
      req.user = payload;
      next();
    } catch (error) {
      return Response.error(res, 401, "Invalid token.");
    }
  }
}
