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

/*
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {



}); */