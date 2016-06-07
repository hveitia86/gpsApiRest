var mongoose = require('mongoose');
var TelephoneAntenna  = mongoose.model('TelephoneAntenna');

//GET - Return all TelephoneAntennas
exports.findAllTelephoneAntennas = function(req, res) {

  TelephoneAntenna.find(function(err, telephoneAntennas) {

    if(err)
    res.send(500, err.message);
    else
    res.status(200).jsonp(telephoneAntennas);
  });
};

//POST - Insert a new TelephoneAntenna in the DB
exports.addTelephoneAntenna = function(req, res) {

    var telephoneAntenna = new TelephoneAntenna({

      radio:         req.body.radio,
      long:          req.body.long,
      lat:           req.body.lat,
      comment:       req.body.comment

    });

    telephoneAntenna.save(function(err, telephoneAntenna) {
        if(err) return res.send(500, err.message);
    res.status(200).jsonp(telephoneAntenna);
    });
};

//PUT Edit TelephoneAntenna
exports.editTelephoneAntenna = function(req, res){

	TelephoneAntenna.findById(req.params.id, function(error, telephoneAntenna){

		telephoneAntenna.lat   =  req.body.lat,
		telephoneAntenna.long  =  req.body.long,
		telephoneAntenna.radio =  req.body.radio,
        telephoneAntenna.comment =  req.body.comment,
        

		telephoneAntenna.save(function(error) {

            if(error) return res.status(500).send(error.message);

		    res.status(200).jsonp(telephoneAntenna);

		 });
	});
};

//OPTIONS Allow CORS to DELETE
exports.optionTelephoneAntenna = function(req, res, next) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

	next();
}

//DELETE Delete TelephoneAntenna
exports.deleteTelephoneAntenna = function(req, res){

    TelephoneAntenna.findById(req.params.id, function(err, telephoneAntenna) {

        telephoneAntenna.remove(function(err) {

            if(err) return res.status(500).send(err.message);

      		res.status(200).jsonp('OK');
        })
    });

};
