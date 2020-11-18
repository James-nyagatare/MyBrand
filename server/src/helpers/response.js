class Response {
  static success(res, status, data) {
    res.status(status).json({
      data,
    });
  }

  static error(res, status, error) {
    res.status(status).json({
      error,
    });
  }
}
module.exports = Response;
