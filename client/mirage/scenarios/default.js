import Mirage, { faker } from 'ember-cli-mirage';

export default function (server) {
  var players = server.createList('players', 5);
  server.createList('matches', 2);

  console.log(players);
}
