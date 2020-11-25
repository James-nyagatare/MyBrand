export class Response {
  static success(res, status, message, data) {
    res.status(status).json({
      message,
      data,
    });
  }

  static error(res, status, error) {
    res.status(status).json({
      error,
    });
  }
}
