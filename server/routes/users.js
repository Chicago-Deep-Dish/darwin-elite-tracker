var UserControllers = require('../controllers/users.js');
const usersRouter = require('express').Router();

usersRouter.get('/login', UserControllers.login);
usersRouter.get('/register', UserControllers.register);
usersRouter.post('/userData', UserControllers.storeUserData);

module.exports = usersRouter;
