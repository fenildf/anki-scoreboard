import Ember from 'ember';

export default Ember.Controller.extend({

  matchTypes: Ember.A([
    {id: "race",    text: "Race"},
    {id: "battle",  text: "Battle"},
    {id: "koth",    text: "King of the Hill"},
    {id: "time",    text: "Time Trial"}
  ]),

  availablePlayers: [],

  actions: {

    addMatch(type, players) {
      console.log("Adding match with type '" + type.id + "' and players: " + players);
    }

  }

});
