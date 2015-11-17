var express    = require('express');
var app        = express();
var Plant = require('./models/plant.js');
var Source = require('./models/source.js');

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
