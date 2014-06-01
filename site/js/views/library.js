/**
 * Created by david on 6/1/14.
 */


var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

  events:{
    'click #add':'addBook'
  },

  initialize: function( initialBooks ) {
    console.log('######### app.LibraryView #initialize')
    this.collection = new app.Library( initialBooks );
    this.render();

    this.listenTo( this.collection, 'add', this.renderBook );
  },

  addBook: function( e ) {
    e.preventDefault();

    var formData = {};

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
      if( $( el ).val() != '' )
      {
        formData[ el.id ] = $( el ).val();
      }
    });

    this.collection.add( new app.Book( formData ) );
  },

  // render library by rendering each book in its collection
  render: function() {
    console.log('######### app.LibraryView #render')
    this.collection.each(function( item ) {
      this.renderBook( item );
    }, this );
  },

  // render a book by creating a BookView and appending the
  // element it renders to the library's element
  renderBook: function( item ) {
    console.log('######### app.LibraryView #renderBook')
    var bookView = new app.BookView({
      model: item
    });
    this.$el.append( bookView.render().el );
  }
});
