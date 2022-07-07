const ctrl = require("../controllers/records");
const recordsRouter = require("express").Router();

recordsRouter.get("/", ctrl.searchRecords);
recordsRouter.post("/", ctrl.addRecord);
recordsRouter.put("/:problem_id", ctrl.updateRecord);
recordsRouter.delete("/:problem_id", ctrl.removeRecord);

module.exports = recordsRouter;
