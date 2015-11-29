var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId

var SourceSchema = new Schema({
  //doc_id: ObjectId,
  type: String,
  field: String,
  sources: [String]
});

Source = mongoose.model('Source', SourceSchema);
module.exports = {
  Source: Source
}
