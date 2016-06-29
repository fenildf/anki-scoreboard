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

    }
  }

});
