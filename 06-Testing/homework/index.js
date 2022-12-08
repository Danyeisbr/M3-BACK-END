const express = require('express');
const { sumArray } = require('./sumArray');
const app = express();


app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const { array , num } = req.body;
  const result = sumArray(array, num)
  res.send({
    result,
  });
});



module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
