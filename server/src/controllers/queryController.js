const Query = require("../models/queryModel");
const Response = require("../helpers/response");

class QueryController {
  static async getQueries(req, res) {
    try {
      const queries = await Query.find();
      Response.success(res, 200, queries);
    } catch (err) {
      Response.error(res, 500, err.message);
    }
  }

  static async createQueries(req, res) {
    try {
      const query = await Query.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      Response.success(res, 201, query);
    } catch (err) {
      Response.error(res, 500, err.message);
    }
  }
}

module.exports = QueryController;
