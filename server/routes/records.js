const ctrl = require('../controllers/records');
const recordsRouter = require('express').Router();

/**
 * get '/'
 * @queries
 * difficulty: easy, medium, hard, none (all)
 * time_frame: daily, weekly, monthly, none (all)
 * topic: ex. array, linkedLists, none (all)
 * search: prompt_name
 */
recordsRouter.get('/', ctrl.searchRecords);
recordsRouter.post('/', ctrl.addRecord);
recordsRouter.put('/:problem_id', ctrl.updateRecord);
recordsRouter.delete('/:problem_id', ctrl.removeRecord);

module.exports = recordsRouter;