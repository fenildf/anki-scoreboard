import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  date: attr('date'),
  type: attr('string'),
  players: hasMany("players")
});
