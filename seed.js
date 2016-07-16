// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var movies_list = [
  {
  title: "The Godfather",
  description: "When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.",
  director: 'Francis Ford Coppola',
  image: "http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  },
  {
  title: "Casino",
  description: "In Casino, De Niro stars as Sam  Rothstein, a Jewish American top gambling handicapper who is called by the Italian Mob to oversee the day-to-day operations at the Tangiers Casino in Las Vegas. His character is based on Frank Rosenthal, who ran the Stardust, Fremont, and Hacienda casinos in Las Vegas for the Chicago Outfit from the 1970s until the early 1980s. Pesci plays Nicholas Santoro, based on real-life Mob enforcer Anthony Spilotro, a made man. Nicky is sent to Vegas to make sure that money from the Tangiers is skimmed off the top and the mobsters in Vegas are kept in line. Sharon Stone plays Ginger McKenna, Ace's scheming, self-absorbed wife, based on Geri McGee.",
  director: 'Martin Scorsese',
  image: "https://upload.wikimedia.org/wikipedia/en/d/d8/Casino_poster.jpg"
  },
  {
  title: "Goodfellas",
  description: "Henry Hill might be a small time gangster, who may have taken part in a robbery with Jimmy Conway and Tommy De Vito, two other gangsters who might have set their sights a bit higher. His two partners could kill off everyone else involved in the robbery, and slowly start to think about climbing up through the hierarchy of the Mob. Henry, however, might be badly affected by his partners' success, but will he consider stooping low enough to bring about the downfall of Jimmy and Tommy?",
  director: 'Martin Scorsese',
  image: "http://ia.media-imdb.com/images/M/MV5BMTY2OTE5MzQ3MV5BMl5BanBnXkFtZTgwMTY2NTYxMTE@._V1_UX182_CR0,0,182,268_AL_.jpg"
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
