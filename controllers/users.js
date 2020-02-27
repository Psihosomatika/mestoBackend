const User = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => res.status(404).send({ message: `Нет пользователя с таким id: ${req.params.userId}` }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};
