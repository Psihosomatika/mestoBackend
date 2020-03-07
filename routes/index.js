const express = require('express');

const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const auth = require('../middlewares/auth');

const router = express.Router();
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/cards', auth, cardsRoutes);
router.use('/users', auth, usersRoutes);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
