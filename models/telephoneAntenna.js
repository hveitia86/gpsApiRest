exports = module.exports = function(app, mongoose) {

  var telephoneAntennaSchema = new mongoose.Schema({
    radio:    { type: String },
    long:     { type: String },
    lat:      { type: String },
  });

  mongoose.model('TelephoneAntenna', telephoneAntennaSchema);

};
