'use strict';

var jason = require('./text.json');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/decode', urlencodedParser, function a(req, res) {

  console.log(jason)

  // new_text = coder(req.body),
  //
  // var text = {
  //   id: jason.length + 1,
  //   orig_text: req.body.text,
  //   new_text: new_text
  // };
  // jason.push(text);
  // res.send(JSON.stringify(todo));
});


app.listen(3000);
