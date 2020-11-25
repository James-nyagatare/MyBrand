import { Response } from "./response";

export const joiResponse = (req, res, schema, next) => {
  const { error } = schema.validate(req.body);
  if (error)
    return Response.error(
      res,
      400,
      error.details[0].message.replace(/\"/g, "")
    );
  next();
};
