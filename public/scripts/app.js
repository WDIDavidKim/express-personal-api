console.log("Sanity Check: JS is working! app.js is connected.");
var template;
var $moviesList;
var allMovies = [];

$(document).ready(function(){

  $moviesList = $('#movieTarget');

  var source = $('#movies-template').html();
  template = Handlebars.compile(source);

  $.ajax ({
    method: 'GET',
    url: '/api/movies',
    success: handleSuccess,
    error: handleError
  });

  $('#newMovieForm').on('submit', function(e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/api/movies',
    data: $(this).serialize(),
    success: newMovieSuccess,
    error: newMovieError
    });
  });

$moviesList.on('click', '.deleteBtn', function() {
  $.ajax({
    method: 'DELETE',
    url: '/api/movies/'+$(this).attr('data-id'),
    success: deleteMovieSuccess,
    error: deleteMovieError,
  });
});

function render() {
  $moviesList.empty();
  var moviesHtml = template({ movies: allMovies });
  $moviesList.append(moviesHtml);
  }

function handleSuccess(json) {
  allMovies = json;
  render();
}

function handleError(e) {
  console.log ("Error!");
  $('#movieTarget').text("Failed to load movies. Something went wrong with the server.");
}

function newMovieSuccess(json) {
  $('#newMovieForm input').val('');
  allMovies.push(json);
  render();
}

function newMovieError() {
  console.log("The movie was not created successfully.");
}

function deleteMovieSuccess(json) {
  var movie = json;
  console.log(json);
  var movieId = movie._id;
  console.log('delete this movie:', movieId);
  for(var i = 0; i < allMovies.length; i++) {
    if(allMovies[i]._id === movieId) {
      allMovies.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteMovieError() {
  console.log("Error, the movie wasn't deleted.");
}


});
