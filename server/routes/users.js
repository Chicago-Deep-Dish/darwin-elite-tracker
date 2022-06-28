const ctrl = require('../controllers/users');
const usersRouter = require('express').Router();

usersRouter.get('/login', ctrl.login);
usersRouter.get('/register', ctrl.register);

module.exports = usersRouter;
