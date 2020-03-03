const express = require('express');

const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use('/cards', auth, cardsRoutes);
router.use('/users', auth, usersRoutes);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
