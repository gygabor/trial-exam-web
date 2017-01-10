'use strict';

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var decoder = require('./decoder.js');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header('Access-Control-Allow-Methods', 'POST, GET');
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
    console.log('Server doesn\'t response', error);
    console.end;
  } else {
    console.log ('Server working!');
  }
});

app.get('/decode/all', function(req, res) {
	connection.query('SELECT * FROM text', function(err, rows, fields) {
		if (err) throw err;
    var response = {"all": []}
    rows.forEach(function(row){
      response.all.push(row.text);
    });
  	res.send(response);
	});
});

app.post('/decode', urlencodedParser, function a(req, res) {
  console.log(req.body)

  if ((req.body.shift < -25) || (req.body.shift > 25)){
    var response = {
    "status": "error",
    "error": "Shift is out of bound"
    }
    res.send(response);
  }else {
    var decodedText = (decoder.decodeText(req.body.shift, req.body.text));
    connection.query('INSERT INTO text (text) VALUES ("' + decodedText + '");', function(err, rows, fields) {
  		if (err) throw err;
      var response = {
        "status": "ok",
        "text": decodedText
      }
    	res.send(response);
    });
	}
});


app.listen(3000);
