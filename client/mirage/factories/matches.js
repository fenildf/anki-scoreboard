import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  _id(i)  {
    return i;
  },
  type() {
    return faker.random.arrayElement(["race", "battle", "koth", "time"]);
  },
  date() {
    return faker.date.recent();
  },
  players() {
    var allPlayers = [];
    for (var i = 1; i <= 4; i++) {
      allPlayers.push(i+"");
    }

    var players = [];
    while (players.length < 4) {
      var playerId = faker.random.arrayElement(allPlayers);
      if (players.indexOf(playerId) < 0 && playerId && playerId !== "") {
        players.push(playerId);
      }
    }

    return players;
  }
});
