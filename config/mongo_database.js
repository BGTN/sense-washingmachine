var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/washdb';

mongoose.connect(mongodbURL, function (err, res) {
	if (err) {
		console.log('Connection refused to ' + mongodbURL);
		console.log(err);
	} else {
		console.log('Connection successful to: ' + mongodbURL);
	}
});

var accelerometerSchema = new mongoose.Schema({
	x: { type: Number },
	y: { type: Number },
	z: { type: Number }	
});

// define models
var AccMeasurementModel = mongoose.model('AccMeasurementModel', accelerometerSchema);

// export models
exports.accMeasurementModel = AccMeasurementModel;

exports
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	
	var accMeasurementEntry = new AccMeasurement({
		x: 1,
		y: 2,
		z: 3
	});
	
	accMeasurementEntry.save(function (err, accMeasurement) {
		if (err) return console.error(err);
		console.log("accMeasurement created");

		AccMeasurement.find(function (err, accMeasurements) {
			if (err) return console.error(err);
			console.log(accMeasurements);
		})

	});

});