const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные в методе поиска пользователей',
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию',
        });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(404).send({
          message: `Пользователь по указанному ${req.params.userId} не найден`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию',
        });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию',
        });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(() => {
      res.status(200).send({ message: 'Профиль успешно обновлён' });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else if (!req.user._id) {
        res.status(404).send({
          message: `Пользователь с указанным ${req.user._id} не найден`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию',
        });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(() => {
      res.status(200).send({ message: 'Аватар успешно обновлён' });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else if (!req.user._id) {
        res.status(404).send({
          message: `Пользователь с указанным ${req.user._id} не найден`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию',
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
