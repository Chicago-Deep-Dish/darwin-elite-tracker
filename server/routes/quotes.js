const quotesRouter = require('express').Router();
const ctrl = require('../controllers/quotes')


quotesRouter.get('/quotes', ctrl.getQuotes);


module.exports = quotesRouter;