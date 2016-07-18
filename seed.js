// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var movies_list = [
  {
  title: "The Godfather",
  director: 'Francis Ford Coppola',
  },
  {
  title: "Casino",
  director: 'Martin Scorsese',
  },
  {
  title: "Goodfellas",
  director: 'Martin Scorsese',
  },
];
db.Movies.remove({}, function(err, movies) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('remove all movies');
  db.Movies.create(movies_list, function(err, movies){
      if (err){ return console.log("Error: ", err); }
      console.log("Created a new movie", movies);
      process.exit();
    });
  }
});
