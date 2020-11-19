var http = require ('http');
var express = require('express');
var app = express();
var products = require ('./products.json');

app.get('/products', function(req, res) {
  res.json(products);})

  const server = http.createServer(app);
  const port = 1984;
  server.listen(port);

  console.debug('hola');