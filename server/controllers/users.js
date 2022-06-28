const models = require("../models/users");
module.exports = {
  login: function (req, res) {
    models
      .login(req.query)
      .then((response) => {
        console.log('res', response);
        res.send(response);
      })
      .catch((err) => {
        console.log("err code", err);
        res.status(401).send(err);
      });
  },
  register: function (req, res) {
    models
      .register(req.query)
      .then((response) => {
        console.log('response', response)
        res.send(response);
      })
      .catch((err) => {
        console.log('err', err)
        res.status(400).send(err);
      });
  },
};
