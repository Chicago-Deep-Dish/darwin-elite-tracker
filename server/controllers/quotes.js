const axios = require('axios');

exports.getQuotes = (req, res) => {
  axios.get('/https://zenquotes.io/api/quotes/')
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('get quotes err', err);
      res.status(404).send(err);
    })

}