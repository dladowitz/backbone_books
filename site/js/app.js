/**
 * Created by david on 6/1/14.
 */

var app = app || {}

$(function(){
  $( '#releaseDate' ).datepicker();
  new app.LibraryView();

});
