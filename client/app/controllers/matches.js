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

      // Create and save a new match with the provided data
      var matchAttributes = {
        date: new Date(),
        type: type.id,
        players:  players
      };
      var newMatch = this.store.createRecord('match', matchAttributes);
      if (newMatch) {
        newMatch.save();
      }

    }
}
});
