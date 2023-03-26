const errorHandler = (error, request, response, next) => {
  const status = error.statusCode || error.code || 500;
  const message = error.message || "Internal error";

  response.status(status).json({ message });
  
};

module.exports = {errorHandler};
