const express = require('express');

const app = express();

app.get('/hello', (request, response) => {
  res.send('Hello World');
})

app.get('/ola', (req, res) => {

  res.send('Ola Mundo '+ req.query.name);
})

app.listen(3000);
