export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
   Config (with defaults).

   Note: these only affect routes defined *after* them!
   */

  this.urlPrefix = 'http://localhost:4500';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
   Shorthand cheatsheet:

   this.get('/posts');
   this.post('/posts');
   this.get('/posts/:id');
   this.put('/posts/:id'); // or this.patch
   this.del('/posts/:id');

   http://www.ember-climirage.com/docs/v0.2.x/shorthands/
   */

  this.get('/players');
  this.get('/players/:id');
  this.passthrough("/players");
  this.passthrough("/players/:id");

  this.get('/matches');
  this.get('/matches/:id');
  this.passthrough("/matches");
  this.passthrough("/matches/:id");

  //this.passthrough("/matches");
  //this.passthrough("/matches/:id");


  //this.get('/players', function () {
  //  return {
  //    players: [
  //      {_id: "5773e621eb00a90afc181a67", name: "Alice"},
  //      {_id: "2", name: "Bla"},
  //      {_id: "3", name: "Blub"}
  //    ]
  //  };
  //});
  //
  //this.get('/players/:id');
  //
  //this.get('/players/5773e621eb00a90afc181a67', function () {
  //  return {_id: "5773e621eb00a90afc181a67", name: "Alice"};
  //});



  //this.get('/matches', function () {
  //  return {
  //    matches: [
  //      {_id: "1", date: "2016-07-01T10:30:00", type: "koth", players: ["5773e621eb00a90afc181a67"]}
  //    ]
  //  };
  //});

}
