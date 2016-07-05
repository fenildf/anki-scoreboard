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

      if (input && input !== ""){
        console.log("Erzeuge neue Spiele: " + input);
        var inputsplit = input.split(",");
        var ausgabe = "input";

        for (var i = 0; i < inputsplit.length; i++){
          var playerName = inputsplit[i];
          var playerAttributes = {name: playerName};
          var existingPlayers = this.store.peekAll('player');
          if (playerName && playerName !== "" && existingPlayers.findBy("name", playerName) === undefined) {
           this.store.createRecord('player', playerAttributes);
          }

          console.log(i+"="+playerName);
        }


      }
    }
  }

});
