const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Не удалось получить данные карточек' });
      return;
    }

    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = router;
