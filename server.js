'use strict';

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var decoder = require('./decoder.js');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cookies',
  database: 'decoder'
});

connection.connect(function (error){
  if (error) {
    console.log('muhahaha', error);
    console.end;
  } else {
    console.log ('WOOOOWW');
  }
});

app.get('/decode/all', function(req, res) {
	connection.query('SELECT * FROM text', function(err, rows, fields) {
		if (err) throw err;
  	res.send(rows);
	});
});


app.post('/decode', function a(req, res) {
  console.log(req.body);
  console.log(decoder.decodeText(req.body.number, req.body.text));

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
