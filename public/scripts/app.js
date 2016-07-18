console.log("Sanity Check: JS is working!");
var template;
var $moviesList;
var allMovies = [];

$(document).ready(function(){

    $moviesList = $('#movieTarget');

    // compile handlebars template
    var source = $('#movies-template').html();
    template = Handlebars.compile(source);

    $.ajax({
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
        error: deleteMovieError
      });
    });



  function render () {
    $moviesList.empty();

    var moviesHtml = template({ movies : allMovies });

    // append html to the view
    $moviesList.prepend(moviesHtml);
  }

  function handleSuccess(json) {
    allMovies = json;
    render();
  }

  function handleError(e) {
    console.log('uh oh');
    $('#movieTarget').text('Failed to load movies, is the server working?');
  }

  function newMovieSuccess(json) {
    $('#newMovieForm input').val('');
    allMovies.push(json);
    render();
  }

  function newMovieError() {

  }
});
  function deleteMovieSuccess(json) {
    var movie = json;
    var movieId = movie._id;

    for(var index = 0; index < allMovies.length; index++) {
      if(allMovies[index]._id === movieId) {
        allMovies.splice(index, 1);
        break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    render();
  }

  function deleteMovieError() {

  }
