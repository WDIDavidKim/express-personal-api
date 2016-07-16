console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var template;
  var $moviesList;
  var allMovies = [];


    $moviesList = $('#movieTarget');

    // compile handlebars template
    var source = $('#books-template').html();
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

  //   $moviesList.on('click', '.deleteBtn', function() {
  //     $.ajax({
  //       method: 'DELETE',
  //       url: '/api/movies/'+$(this).attr('data-id'),
  //       success: deleteMovieSuccess,
  //       error: deleteMovieError
  //     });
  //   });
  //
  // });
  //
  // // helper function to render all posts to view
  // // note: we empty and re-render the collection each time our post data changes
  // function render () {
  //   // empty existing posts from view
  //   $booksList.empty();
  //
  //   // pass `allBooks` into the template function
  //   var moviesHtml = template({ movies: allmovies });
  //
  //   // append html to the view
  //   $moviesList.append(moviesHtml);
  // }

  function handleSuccess(json) {
    allMovies = json;
    render();
  }

  function handleError(e) {
    console.log('uh oh');
    $('#movieTarget').text('Failed to load movies, is the server working?');
  }

  function newBookSuccess(json) {
    $('#newMovieForm input').val('');
    allBooks.push(json);
    render();
  }

  function newMovieError() {

  }
});
  // function deleteMovieSuccess(json) {
  //   var book = json;
  //   var bookId = movie._id;
  //
  //   // find the book with the correct ID and remove it from our allBooks array
  //   for(var index = 0; index < allMovies.length; index++) {
  //     if(allMovies[index]._id === movieId) {
    //     allMovies.splice(index, 1);
    //     break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    //   }
    // }
  //   render();
  // }
  //
  // function deleteMovieError() {
  //
  // }

// your code
