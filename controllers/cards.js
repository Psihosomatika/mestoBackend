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
    .orFail(() => res.status(404).send({ message: `Нет карточки с таким id: ${req.params.cardId}` }))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        return Promise.reject(new Error('Не хватает прав'));
      }
      Card.remove(card);
    })
    .then(() => res.send({ data: 'Карточка удалена' }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
