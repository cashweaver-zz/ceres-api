var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gardendb');
var Schema = mongoose.Schema;

var PlantSchema = new Schema({
  name: {
    common: [String],
    scientific: String
  }
});

module.exports = mongoose.model('Plant', PlantSchema);
