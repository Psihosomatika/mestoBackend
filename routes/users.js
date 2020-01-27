const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const fsPromises = fs.promises;
const usersData = fsPromises.readFile(dataPath, { encoding: 'utf8' });

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  usersData
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => {
        const { _id: itemId } = item;
        return itemId === id;
      });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Не удалось получить данные пользователей' }));
});

router.get('/users', (req, res) => {
  usersData
    .then((data) => res.send(JSON.parse(data)))
    .catch(() => res.status(500).send({ message: 'Не удалось получить данные пользователей' }));
});

module.exports = router;
