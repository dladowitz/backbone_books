/**
 * Created by david on 6/1/14.
 */


var app = app || {};

app.LibraryView = Backbone.View.extend({
  initialize: function() {
    console.log('######### app.LibraryView #initialize')
    this.collection = new app.Library();
    this.collection.fetch();
    this.render();

    this.listenTo( this.collection, 'add', this.renderBook );
    this.listenTo( this.collection, 'reset', this.render() );
  },

  el: '#books',

  events:{
    'click #add':'addBook'
  },

  addBook: function( e ) {
    e.preventDefault();

    var formData = {};

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
      if( $( el ).val() != '' )
      {
        if( el.id === 'keywords' ) {
          formData[ el.id ] = [];
          _.each( $( el ).val().split( ' ' ), function( keyword ) {
            formData[ el.id ].push({ 'keyword': keyword });
          });
        } else if( el.id === 'releaseDate' ) {
          formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
      // Clear input field value
      $( el ).val('');
    });

    this.collection.create( formData );
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

