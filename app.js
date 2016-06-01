var express        = require("express"),
    cors           = require('cors'),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override");
    mongoose       = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/GPSCoords', function(err, res) {
    if(err)throw err;
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

// Import Models and controllers
var models  = require('./models/gpsModels')(app, mongoose);
var TelephonModel = require('./models/telephoneAntenna')(app, mongoose);
var GPSCtrl = require('./controllers/gpsController');
var TelCtrl = require('./controllers/telephoneAntennaController');

// API routes
var router = express.Router();

// Example Route
router.get('/', function(req, res) {
   res.send("GPS Test Tracker!");
});
app.use(router);

router.route('/gpsCoords')
  .get(GPSCtrl.findAllGPS)
  .post(GPSCtrl.addGPSCoord);

router.route('/gpsCoords/:phone', cors())
  .get(GPSCtrl.findByPhoneNumber)

router.route('/telephoneAntenna')
  .get(TelCtrl.findAllTelephoneAntennas)
  .post(TelCtrl.addTelephoneAntenna);

router.route('/telephoneAntenna/:id', cors())
  .put(TelCtrl.editTelephoneAntenna)
  .options(TelCtrl.optionTelephoneAntenna)
  .delete(TelCtrl.deleteTelephoneAntenna);

app.use('/api', router);


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
