// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var db = require('./models');

/************
 * DATABASE *
 ************/
var profile = [
  {
    name: 'David Kim',
    location : 'Alameda',
    age: '21 ish',
    github_link: "https://github.com/WDIDavidKim",
    github_profile_image: "https://avatars3.githubusercontent.com/u/20020736?v=3&s=460",
    about_me: [
      {
        hobbies: "fishing, camping, sleeping, and eating.",
        pets: "A yellow Labrabor and a Austrailian Cattle dog mix."
      }
    ]
  }
];

app.get('/api/profile', function (req, res) {
  res.json(profile);
});

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//get all movies
app.get('/api/movies', function (req, res) {
  db.Movies.find()
    .populate('movies')
    .exec(function(err, movies){
    if (err) { return console.log("index error: " + err); }
    res.json(movies);
  });
});

//get movie by id
app.get('/api/movies/:id', function (req, res) {
  db.Movies.findById(req.params.id, function(err, id){
      if (err) { return console.log("show error: " + err); }
      res.json(id);
    });
  });

//create a new movie
app.post('/api/movies', function (req, res) {
  var newMovie = new db.Movies({
    title: req.body.movie,
    // description: req.body.description,
    director: req.body.director,
    // image: req.body.image,
  });
  newMovie.save(function newMovieSaved(err, saveMovie){
    // res.json(saveMovie);
    res.redirect('/');
  });
});

//delete a movie
app.delete('/api/movies/:id', function (req, res) {
  console.log(req.params);
  var movieId = req.params.id;

  db.Movie.findOneAndRemove({ _id: movieId }, function (err, deletedMovie) {
    res.json(deletedMovie);
  });
});

  /*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/WDIDavidKim/express-personal-api", // CHANGE ME
    base_url: "https://peaceful-tundra-47993.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Directory of endpoints."},
      {method: "GET", path: "https://peaceful-tundra-47993.herokuapp.com/api/profile", description: "About me : David Kim"}, // CHANGE ME
      {method: "GET", path: "https://peaceful-tundra-47993.herokuapp.com/api/movies", description: "Gets all movies."},
      {method: "GET", path: "/api/movies/:id", description: "Gets a movie by its id."},
      {method: "POST", path: "https://peaceful-tundra-47993.herokuapp.com/api/movies", description: "Creates a new movie."},
      {method: "DELETE", path: "/api/movies/:id", description: "Delete a new movie."}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
