import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  _id(i)  {
    return i+1;
  },
  name(i) {
    var firstName = faker.name.firstName();
    console.log("Creating player #" + (i+1) + " with name '" + firstName + "'.");
    return firstName;
  }
});
