var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MoviesSchema = new Schema({
  title: String,
  description: String,
  date: String,
  director: String,
});

var Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;
