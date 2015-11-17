var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gardendb');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId

var SourceSchema = new Schema({
  //doc_id: ObjectId,
  type: String,
  field: String,
  sources: [String]
});

module.exports = mongoose.model('Source', SourceSchema);
