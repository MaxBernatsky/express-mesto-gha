const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => {
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(() => {
      res.status(200).send({ message: 'Лайк успешно добавлен' });
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(() => {
      res.status(200).send({ message: 'Лайк успешно удален' });
    })
    .catch((error) => {
      res.status(500).send(`Произошла ошибка: ${error}`);
    });
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
