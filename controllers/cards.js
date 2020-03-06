const Card = require('../models/card.js');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error(`Нет карточки с таким id: ${req.params.cardId}`);
      error.statusCode = 404;
    })
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        return res.status(403).send({ message: 'Не хватает прав' });
      }
      Card.remove(card);
    })
    .then(() => res.send({ data: 'Карточка удалена' }))
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error(`Нет карточки с таким id: ${req.params.cardId}`);
      error.statusCode = 404;
    })
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error(`Нет карточки с таким id: ${req.params.cardId}`);
      error.statusCode = 404;
    })
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};
