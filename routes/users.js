const routerUsers = require('express').Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.patch('/me', updateProfile);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
