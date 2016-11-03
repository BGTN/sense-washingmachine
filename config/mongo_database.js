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
	z: { type: Number },
	date: { type: Date, default: Date.now }	
});

// define models
var AccMeasurementModel = mongoose.model('AccMeasurementModel', accelerometerSchema);

// export models
exports.accMeasurementModel = AccMeasurementModel;
