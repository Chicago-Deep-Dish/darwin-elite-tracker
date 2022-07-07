const models = require("../models/records");

exports.searchRecords = (req, res) => {
  models
    .searchRecords(req.query, req.query.userID)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("searchRecords err", err);
      res.status(404).send(err);
    });
};

exports.addRecord = (req, res) => {
  models
    .addRecord(req.body, req.query.userID)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("addRecord err", err);
      res.status(405).send(err);
    });
};

exports.updateRecord = (req, res) => {
  models
    .updateRecord(req.body, req.query.userID, req.params.problem_id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("updateRecord err", err);
      res.status(405).send(err);
    });
};

exports.removeRecord = (req, res) => {
  models
    .removeRecord(req.query.userID, req.params.problem_id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("removeRecord err", err);
      res.status(406).send(err);
    });
};
