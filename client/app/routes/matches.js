import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('match');
  },

  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    controller.availablePlayers = this.store.findAll('player');
    //controller.availablePlayers = Ember.A([{id: "foo", text: "Foo"},{id: "bla", text: "Bla"}]);
  }

});
