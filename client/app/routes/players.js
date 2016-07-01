import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('player');
  },

  actions: {
    createPlayer(input) {
      // input enthällt den Text aus dem Feld. Zum Beispiel "Lasse;Sebastian;Florian"
      // Aus dem Text kann man ein sogenanntes Array erzeugen indem man die Funktion split() aufruft.
      // Siehe auch https://wiki.selfhtml.org/wiki/Split
      var playerNames = input.split(";");
      for (var i = 0; i < playerNames.length; i++) {
        var playerName = playerNames[i];
        if (playerName && playerName !== "" && playerName !== "Name") {
          console.log("Creating player '" + playerName + "'");
          var newPlayer = this.store.createRecord('player', {
            name: playerName
          });
          if (newPlayer) {
            newPlayer.save();
          }

        } else {
          console.log("Player needs a name. ", this.get("playerName"));
        }
      }
    }
  }

});
