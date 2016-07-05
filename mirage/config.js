export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
   Config (with defaults).

   Note: these only affect routes defined *after* them!
   */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
   Shorthand cheatsheet:

   this.get('/posts');
   this.post('/posts');
   this.get('/posts/:id');
   this.put('/posts/:id'); // or this.patch
   this.del('/posts/:id');

   http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
   */

  this.get('/players', function () {
    return {
      data: [{
        type: 'player',
        id: 1,
        attributes: {
          name: 'Bob'
        }
      },{
        type: 'player',
        id: 2,
        attributes: {
          name: 'Alice'
        }
      }]
    };
  });

  this.get('/matches', function () {
      return {
        data: [{
          type: 'match',
          id: 1,
          attributes: {
            type: 'battle',
            date: '2016-07-01T09:45:00'
          }
        },{
          type: 'match',
          id: 2,
          attributes: {
            type: 'koth',
            date: '2016-07-01T10:00:00'
          }
        }]
      };
    });

}
