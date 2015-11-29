var mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
  dlyTMaxNormal: {
    data: [Number],
    completeness: String,
  },
  dlyTMaxStddev: {
    data: [Number],
    completeness: String,
  },
  dlyTMinNormal: {
    data: [Number],
    completeness: String,
  },
  dlyTMinStddev: {
    data: [Number],
    completeness: String,
  },
  location: {
    ncdc_meta: {
      gsn_flag: String,
      hcn_flag: String,
      wmoid: String,
      method: String
    },
    lnglat: {
      type: {type: String},
      coordinates: {type: [Number], index: '2dsphere'}
    },
    address : {
      formatted: String
    }
  },
  stationId: String,
});

StationSchema.index({'location.lnglat': '2dsphere'});

var Station = mongoose.model('Station', StationSchema);
module.exports = {
  Station: Station
}
