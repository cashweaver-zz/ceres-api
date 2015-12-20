'use strict';
var express = require('express'),
  app = express(),
  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gardendb');

var Plant = require('./models/plant'),
  Station = require('./models/station');

// Routes
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// TODO: sanatize all of this input

router.use(function (req, res, next) {
  console.log("Request received.");
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/plants')
  .get(function (req, res) {
    Plant.find(function (err, plants) {
      if (err) {
        res.send(err);
      }

      res.json(plants);
    });
  });

router.route('/plants/:plant_id')
  .get(function (req, res) {
    Plant.findById(req.params.plant_id, function (err, plant) {
      if (err) {
        res.send(err);
      }

      res.json(plant);
    })
  });

router.route('/plants/:plant_id/growingSeason/:stationId')
  .get(function (req, res) {
    Plant.findById(req.params.plant_id, function (err, plant) {
      if (err) {
        res.send(err);
      }

      Station.findOne({'stationId': req.params.stationId}).exec(function (err, station) {
        if (err) {
          res.send(err);
        }

        var probable_mins = station.dlyTMinNormal.data.map(function (temp, index) {
          // z-score -1.2816 -> 90% confidence
          return temp + (-1.2816 * station.dlyTMinStddev.data[index]);
        });
        var probable_maxes = station.dlyTMaxNormal.data.map(function (temp, index) {
          // z-score 1.2816 -> 90% confidence
          return temp + (1.2816 * station.dlyTMaxStddev.data[index]);
        });

        var safe_growing_days = probable_mins.map(function (min, index) {
          if (min >= plant.climate.temperature.min && probable_maxes[index] <= plant.climate.temperature.max) {
             return 1;
          }
          else {
            // Too hot and too cold to grow
            if (min < plant.climate.temperature.min && probable_maxes[index] > plant.climate.temperature.max) {
              return -3;
            }
            // Too hot to grow
            else if (probable_maxes[index] > plant.climate.temperature.max) {
              return -2;
            }
            // Too cold to grow
            //if (min < plant.climate.temperature.min) {
            else {
              return -1;
            }
          }
        })

        res.json(safe_growing_days);
      });
    })

  });

router.route('/stations')
  .get(function (req, res) {
    Station.find(function (err, stations) {
      if (err) {
        res.send(err);
      }

      res.json(stations);
    });
  });

router.route('/stations/:stationId')
  .get(function (req, res) {
    Station.findOne({'stationId': req.params.stationId}).exec(function (err, station) {
      if (err) {
        res.send(err);
      }

      res.json(station);
    })
  });

// TODO: Use Google's Reverse Geocoding api to get accurate location information.
// The data from NCDC is not trustworthy (USC00046685 claims to be in Chico, when it's actually in Paradise)
router.route('/stationsByPostalCode/:postalCode')
  .get(function (req, res) {
    Station.find({'location.postalCode': req.params.postalCode}).exec(function (err, stations) {
      if (err) {
        res.send(err);
      }

      res.json(stations);
    })
  });

// TODO: Ensure stations returned have all necessary data (all 4 temperature arrays)
router.route('/nearestStation/:lat/:lng/:maxDistance')
  .get(function (req, res) {
    Station.find({
      'location.lnglat': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)]
          },
          $maxDistance: parseInt(req.params.maxDistance)
        }
      }}).exec(function (err, stations) {
      if (err) {
        console.log("error!");
        console.log(err);
        res.send(err);
      }

      console.log("lng: "+req.params.lng)
      console.log("lat: "+req.params.lat)
      console.log("maxDistance: "+req.params.maxDistance);
      res.json(stations);
    })
  });

// more routes for our API will happen here

// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
