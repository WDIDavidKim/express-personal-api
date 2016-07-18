var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String,
  director: String,
  image: String,
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
