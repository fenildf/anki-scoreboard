import Ember from 'ember';

export default Ember.Route.extend({

  model() {

    var matches = this.store.findAll('match');

    var rank1 = {player: "Player1", points: 25};
    var rank2 = {player: "Player2", points: 22};
    var rank3 = {player: "Player3", points: 18};
    var rank4 = {player: "Player4", points: 14};
    var rank5 = {player: "Player5", points: 10};
    var rank6 = {player: "Player6", points: 5};
    var rank7 = {player: "Player7", points: 3};

    return [rank1, rank2, rank3, rank4, rank5, rank6, rank7];
  }

});


