const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND } = require('../utils/httpStatusCodes');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.post('/signup', createUser);

router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);

router.use('/cards', cardRouter);

router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
