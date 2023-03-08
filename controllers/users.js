const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    });
};

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(() => {
      res.status(200).send({ message: 'Профиль успешно обновлён' });
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(() => {
      res.status(200).send({ message: 'Аватар успешно обновлён' });
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
