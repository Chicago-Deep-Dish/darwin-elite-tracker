var UserControllers = require('../controllers/users.js');
const usersRouter = require('express').Router();

usersRouter.get('/login', UserControllers.login);
usersRouter.get('/register', UserControllers.register);

module.exports = usersRouter;
