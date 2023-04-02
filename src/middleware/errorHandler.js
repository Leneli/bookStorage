const {NOT_FOUND} = require('../constants/responseStatusCode');

const errorHandler = (req, res) => {
  const {url, method} = req;

  res.status(NOT_FOUND);
  res.json(`${NOT_FOUND} | Cannot ${method} ${url}`);
};

module.exports = {errorHandler};
