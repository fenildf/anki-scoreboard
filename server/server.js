var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// database  connection
const DB_HOST = "192.168.99.100";
const DB_PORT = "32768";
const DB_NAME = "ankiScores";

var app = express();

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

var databaseUrl='mongodb://' + DB_HOST + ':' + DB_PORT  + '/' + DB_NAME;
console.log("Connectiong to database. " + databaseUrl);
mongoose.connect(databaseUrl);

var playerSchema = new mongoose.Schema({
  name: 'string'
});

var Player = mongoose.model('players', playerSchema);

app.get('/api/',function(req,res) {
  res.send('Working');
});

app.get('/api/players', function(req,res) {
  Player.find({},function(err,docs) {
    if(err) {
      res.send({error:err});
    }
    else {
      res.send({players:docs});
    }
  });
});

app.post('/api/players', function(req,res) {
  var playerName = req.body.player.name;
  console.log("POST to players: " + playerName);

  if (playerName && playerName !== "") {
    new Player({name: playerName}).save();
  }


});

app.listen('4500');
