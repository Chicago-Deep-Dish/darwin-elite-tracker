const models = require("../models/records");

exports.searchRecords = (req, res) => {
  models
    .searchRecords(req.query)
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
      // console.log("login response", response);
      res.send(response);
    })
    .catch((err) => {
      console.log("updateRecord err", err);
      res.status(405).send(err);
    });
};

exports.updateRecord = (req, res) => {
  models
    .updateRecord(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("updateRecord err", err);
      res.status(405).send(err);
    });
};

exports.removeRecord = (req, res) => {
  console.log('req.cookies', req.cookies);
  models
    .removeRecord('cookie', req.params.problem_id ,req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("removeRecord err", err);
      res.status(406).send(err);
    });
};
