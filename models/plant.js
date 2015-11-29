var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlantSchema = new Schema({
  name: {
    common: [String],
    scientific: String
  },
  climate: {
    temperature: {
      min: Number,
      max: Number
    }
  }
});

Plant = mongoose.model('Plant', PlantSchema);
module.exports = {
  Plant: Plant
}
