const User = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send(`Нет пользователя с таким id: ${req.params.userId}`);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.message) {
        res.status(404).send(`Нет пользователя с таким id: ${req.params.userId}`);
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};
