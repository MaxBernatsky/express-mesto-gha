const UNAUTHORIZED = require('../utils/httpStatusCodes');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthorizationError;
