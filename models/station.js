'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
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

schema.index({'location.lnglat': '2dsphere'});

module.exports = mongoose.model('Station', schema);
