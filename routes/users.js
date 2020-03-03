const routerUsers = require('express').Router();

const {
  getUsers,
  getUserById,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);

module.exports = routerUsers;
