const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/httpStatusCodes');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка по умолчанию',
      });
    });
};

const getUserById = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Некорректный Id пользователя' });
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию' });
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка по умолчанию',
      });
    }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(updatedUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка по умолчанию',
      });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(updatedUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка по умолчанию',
      });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token, message: 'Логин выполнен успешно' });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
