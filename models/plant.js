var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlantSchema = new Schema({
  name: {
    common: [String],
    scientific: String
  }
});

Plant = mongoose.model('Plant', PlantSchema);
module.exports = {
  Plant: Plant
}
