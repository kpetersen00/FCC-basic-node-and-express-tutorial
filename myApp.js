var express = require('express');
var app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
console.log('Hello World');
// app.get('/', (req, res) => res.send('Hello Express'));

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/json', (req, res) => {
  let response = { message: 'Hello json' };
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
});

app.use('/public', express.static(__dirname + '/public'));

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => res.json({ echo: req.params.word }));

app.use('/name', bodyParser.urlencoded({ extended: false }));
app.get('/name', (req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

module.exports = app;
