var express    = require('express');
var app        = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gardendb');

// Models
var Plant = require('./models/plant.js').Plant;
var Source = require('./models/source.js').Source;
var Station = require('./models/station.js').Station;

// Disabled because this API doesn't need POSt
// configure app to use bodyParser()
// this will let us get the data from a POST
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
// Disabled because this API doesn't need POSt


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

      console.log(req.params.stationId);
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

router.route('/nearestStation/:lng/:lat/:maxDistance')
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
console.log('Magic happens on port ' + port);
