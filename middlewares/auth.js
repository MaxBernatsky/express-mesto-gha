const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/httpStatusCodes');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload;

  next();
};

module.exports = { auth };
