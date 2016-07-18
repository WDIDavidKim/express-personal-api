var db = require('./models');

var movies_list = [
  {
  title: "The Godfather",
  director: 'Francis Ford Coppola',
  image: "http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  },
  {
  title: "Casino",
  director: 'Martin Scorsese',
  image: "http://ia.media-imdb.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg",
  },
  {
  title: "Goodfellas",
  director: 'Martin Scorsese',
  image: "http://ia.media-imdb.com/images/M/MV5BMTY2OTE5MzQ3MV5BMl5BanBnXkFtZTgwMTY2NTYxMTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
  },
];
db.Movies.remove({}, function(err, movies) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('remove all movies');

db.Movies.create(movies_list, function(err, movies){
    if (err){ return console.log("Error: ", err);
    }
    console.log("Created a new movie", movies);
    process.exit();
  });
  }
});
