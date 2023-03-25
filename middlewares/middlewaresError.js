const INTERNAL_SERVER_ERROR = require('../utils/httpStatusCodes');

const middlewaresError = (error, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
  next();
};

module.exports = { middlewaresError };
