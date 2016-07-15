var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');

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
  name: 'string',
  won: 'number',
  lost: 'number',
  played: 'number'
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

  // Update players wins/looses/played
  _.each(matchPlayers, function(playerId, index) {
    console.log("Update player: #" + index + " " + playerId);

    //weirdCar.update({$inc: {wheels:1}}, { w: 1 }, callback);

    //Player.update({_id: playerId}, {name: "Alice2", wins: 5, played: 10});

    var updates = {
      $inc: {
        won:index == 0 ? 1:0,
        lost:index == matchPlayers.length-1 && matchPlayers.length > 1 ? 1:0,
        played:1
      }
    };

    Player.update({_id: playerId}, updates, null, function (err, raw) {
      if (err) return handleError(err);
      console.log('The raw response from Mongo was ', raw);
    });

  });
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
  var id = req.params.id;
  console.log("Fetch player with id " + id);
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

  Match.find({}).populate('players').exec(
          function(err,matches) {

            // Holds results for each match type
            var results = {};

            var totalResults = [];

            // Loop: matches
            for (var i=0; i < matches.length; i++) {
              var match = matches[i];
              var matchType = match.type;
              var players = match.players;

              var matchResults = results[matchType];
              if (!matchResults) {
                matchResults = [];
                results[matchType] = matchResults;
              }

              // Loop: players
              for (var j=0; j < players.length; j++) {

                var player = players[j];

                var points = 0;
                switch (j) {

                  case 0:
                    points = 10;
                    break;

                  case 1:
                    points = 5;
                    break;

                  case 2:
                    points = 2;
                    break;

                  default:
                    points = 0;
                }

                // Calculate match points
                var matchPoints = points;
                var p = _.find(matchResults, function(result){
                  return result.player == player;
                });

                if (p) {
                  matchPoints = p.total + points;
                  p.total = matchPoints;
                } else {
                  matchResults.push({player: player, total: points, won: 0, lost: 0});
                }

                // Calculate total points

                // Check if player already contained in results
                p = _.find(totalResults, function(result){
                  return result.player == player;
                });

                var totalPoints = points;
                if (p) {
                  totalPoints = p.total + points;
                  p.total = totalPoints;
                } else {
                  totalResults.push({player: player, total: totalPoints});
                }
                //console.log("#" + (j + 1) + " " + player.name + " --> " + totalPoints);

              } // end loop: players

            } // end loop: matches


            results['total'] = totalResults;

            var keys = _.keys(results);

            _.each(keys, function(key) {
              var resultsArray = results[key];

              // Sort results ASC
              var sortedResults = _.sortBy(resultsArray, function(result){
                return result.total;
              });

              // Reverse sorted results to DSC
              sortedResults.reverse();

              // Add rank
              var lastPoints;
              var lastRank;
              _.each(sortedResults, function(result, index) {
                var rank = index+1;

                if (result.total === lastPoints) {
                  _.extend(result, {rank: lastRank});
                } else {
                  _.extend(result, {rank: rank});
                  lastRank = rank;
                }

                lastPoints = result.total;
              });

              results[key] = sortedResults;
            });

            if(err) {
              res.send({error:err});
            }
            else {
              res.send({results:results});
            }
          }
  );
});

/** --------- RESULTS END ----------------*/

app.listen('4500');
