const jwt = require("jsonwebtoken");
const env = require("../config/env");
const Response = require("../helpers/response");

class authMiddleware {
  static adminAuth(req, res, next) {
    const token = req.header("token");
    if (!token)
      return Response.error(res, 401, "Access denied. no token provided ");
    try {
      const payload = jwt.verify(token, env.JWT_KEY);
      req.user = payload;
      next();
    } catch (error) {
      return Response.error(res, 401, "Invalid token.");
    }
  }
}

module.exports = authMiddleware;
