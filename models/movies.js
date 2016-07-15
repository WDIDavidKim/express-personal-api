var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MoviesSchema = new Schema({
  title: String,
  description: String,
  realeaseDate: String,
  director: String,
  image: String,
});

var Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;
