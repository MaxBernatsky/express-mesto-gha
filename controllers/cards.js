const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при поиске карточек',
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Ошибка при передачи данных о карточке' });
        return;
      }
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Ошибка при передачи данных о карточке' });
        return;
      }
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Ошибка при передачи данных о карточке' });
        return;
      }
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
