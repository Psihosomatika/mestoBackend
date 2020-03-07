const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

const router = express.Router();
const { createUser, login } = require('../controllers/users');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).alphanum(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).alphanum(),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required(),
  }),
}), createUser);

router.use('/cards', auth, cardsRoutes);
router.use('/users', auth, usersRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
