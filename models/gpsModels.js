exports = module.exports = function(app, mongoose) {

  var gpsSchema = new mongoose.Schema({
    cellNumber:    { type: String },
    date:          { type: String },
    time:          { type: String },
    long:          { type: String },
    lat:           { type: String },
    temp:	   { type: String },
    co2: 	   { type: String },
  });

  mongoose.model('GPS', gpsSchema);

};
