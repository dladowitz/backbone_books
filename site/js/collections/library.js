/**
 * Created by david on 6/1/14.
 */

var app = app || {};

app.Library = Backbone.Collection.extend({
  model: app.Book,
  url: '/api/books',
});
