
var mongoose = require('mongoose');
var GPS  = mongoose.model('GPS');

//GET - Return all coordinates in the DB
exports.findAllGPS = function(req, res) {

    GPS.find(function(err, gpsCoords) {

    if(err) res.send(500, err.message);

    console.log('GET /gpsCoords')
        res.status(200).jsonp(gpsCoords);
    });
};

//GET - Return all Coordinates with specified phone
exports.findByPhoneNumber = function(req, res) {

    GPS.find({cellNumber: req.params.phone}, function(err, gpsCoords) {

    if(err){
    	return res.send(500, err.message);
    }
        res.status(200).jsonp(gpsCoords);
    });
};

//POST - Insert a new Coordinate in the DB
exports.addGPSCoord = function(req, res) {

    console.log('POST');
    console.log(req.body);

    var gpsCoord = new GPS({

      cellNumber:    req.body.cellNumber,
      date:          req.body.date,
      time:          req.body.time,
      long:          req.body.long,
      lat:           req.body.lat,

    });

    gpsCoord.save(function(err, gpsCoord) {
        if(err) return res.send(500, err.message);
    res.status(200).jsonp(gpsCoord);
    });
};
