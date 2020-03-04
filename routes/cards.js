const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const fsPromises = fs.promises;
const cardsData = fsPromises.readFile(dataPath, { encoding: 'utf8' });

router.get('/', (req, res) => {
  cardsData
    .then((data) => res.send(JSON.parse(data)))
    .catch(() => res.status(500).send({ message: 'Не удалось получить данные карточек' }));
});

module.exports = router;
