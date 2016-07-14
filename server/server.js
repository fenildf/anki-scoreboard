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

var matchesSchema = new mongoose.Schema({
  type: 'string',
  date: 'Date',
  players: [{type: 'ObjectId', ref: 'players'}]
});

var Player = mongoose.model('players', playerSchema);
var Match = mongoose.model('matches',matchesSchema);

app.get('/api/',function(req,res) {
  res.send('Working');
});


/**-----------MATCHES START --------------*/
app.get('/api/matches', function(req,res) {
  Match.find({}).populate('players.player').exec(
      function(err,match) {
        if(err) {
          res.send({error:err});
        }
        else {
          console.log(err);
          res.send({matches:match});
        }
      }
  );
});

app.get('/api/matches/:id', function(req,res) {
  Match.find({_id: id}).populate('players.player').exec(
      function(err,match) {
        if(err) {
          res.send({error:err});
        }
        else {
          console.log(err);
          res.send({matches:match});
        }
      }
  );
});

app.post('/api/matches', function(req,res) {
  var matchType = req.body.match.type;
  var matchDate = req.body.match.date;
  var matchPlayers = req.body.match.players;
  if (matchType) {
    new Match({type: matchType, date: matchDate, players: matchPlayers}).save();
  }
});


/** --------- PLAYER START --------------*/
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

app.get('/api/players/:id', function(req,res) {
  console.log("Fetch player with id " + req.params.id);
  Player.find({_id: id},function(err,docs) {
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
    new Player({name: playerName, matches: []}).save();
  }
});

/**---------------------PLAYER END ----------------------*/


/** --------- RESULTS START --------------*/
app.get('/api/results', function(req,res) {



  Match.find({}).populate('players.player').exec(
          function(err,match) {
            if(err) {
              res.send({error:err});
            }
            else {
              console.log(err);
              res.send({matches:match});
            }
          }
  );
});

/** --------- RESULTS END ----------------*/

app.listen('4500');
