const express = require('express');

const cardsRoutes = require('./cards');
const usersRoutes = require('./users');

const router = express.Router();

router.use('/cards', cardsRoutes);
router.use('/users', usersRoutes);

router.use('*', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(404).send('{ "message": "Запрашиваемый ресурс не найден" }');
});

module.exports = router;
