const models = require("../models/users");
exports.login = (req, res) => {
  models
    .login(req.query)
    .then((response) => {
      res.cookie('userId', response.user.uid);
      res.send(response);
    })
    .catch((err) => {
      console.log("login err", err);
      res.status(401).send(err);
    });
};

exports.register = (req, res) => {
  models
    .register(req.query)
    .then((response) => {
      console.log(response);
      res.cookie('userId', response.user.uid);
      res.send(response);
    })
    .catch((err) => {
      console.log("register err", err);
      res.status(402).send(err);
    });
};

exports.storeUserData = (req, res) => {
  models
    .storeUserData(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("storeUserData err", err);
      res.status(403).send(err);
    });
};
