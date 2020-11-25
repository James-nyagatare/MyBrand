import Query from "../models/queryModel";
import { Response } from "../helpers/response";

export class QueryController {
  static async getQueries(req, res) {
    try {
      const queries = await Query.find();
      Response.success(res, 200, "Sucessfully retrieved queries", queries);
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
      Response.success(res, 201, "Sucessfully Created query", query);
    } catch (err) {
      Response.error(res, 500, err.message);
    }
  }
}
