const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  switch (status) {
    case 400:
      return res.status(status).json({
        message: err.message,
        statusCode: status,
      });
      break;
    case 409:
      return res.status(status).json({
        message:
          " Duplicate resource or conflicting request (e.g., item already exists)",
        statusCode: status,
      });
      break;
    case 500:
      return res.status(status).json({
        message: "Interner server problem",
        statusCode: status,
      });
      break;
    case 404:
      return res.status(status).json({
        message: "not found",
        statusCode: status,
      });
      break;
    default:
      return res.status(status).json({
        message: "not found",
        statusCode: status,
      });
      break;
  }
};
module.exports = errorHandler;
