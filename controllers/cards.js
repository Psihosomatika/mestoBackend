const Card = require('../models/card.js');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new BadRequestError('Данные не прошли валидацию')));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError(`Нет карточки с таким id: ${req.params.cardId}`))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        return Promise.reject(new ForbiddenError('Не хватает прав'));
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
    .orFail(() => new NotFoundError(`Нет карточки с таким id: ${req.params.cardId}`))
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
    .orFail(() => new NotFoundError(`Нет карточки с таким id: ${req.params.cardId}`))
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};
