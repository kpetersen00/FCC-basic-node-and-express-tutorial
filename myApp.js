var express = require('express');
var app = express();
require('dotenv').config();
console.log('Hello World');
// app.get('/', (req, res) => res.send('Hello Express'));
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/json', (req, res) => {
  let response = { message: 'Hello json' };
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
});
app.use('/public', express.static(__dirname + '/public'));
module.exports = app;
