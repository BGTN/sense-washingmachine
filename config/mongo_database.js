var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/washdb';

//add MAC addresses of sensor tags here
var macAddressesOfSensorTags = ["Mac Address 1", "Mac Address 2"];

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

var washingMachineSchema = new mongoose.Schema({
	mac: { type: String },
	running: { type: Boolean, default: false },
	updated: { type: Date, default: Date.now }
});

// define models
var AccMeasurementModel = mongoose.model('AccMeasurementModel', accelerometerSchema);
var WashingMachineModel = mongoose.model('WashingMachineModel', washingMachineSchema);

// export models
exports.accMeasurementModel = AccMeasurementModel;
exports.washingMachineModel = WashingMachineModel;

// add washing machines if they have not been created yet
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	WashingMachineModel.find(function (err, washingMachines) {
		if (err) return console.error(err);

		// if washingMachines are still not created, add them
		if (washingMachines.length < 2) {
			WashingMachineModel.remove({}, function(){
				//todo delete all included washing machines first
				macAddressesOfSensorTags.forEach(function(mac_address) {
					var washingMachineEntry = new WashingMachineModel({
						mac: mac_address
					});
					washingMachineEntry.save(function (err, washingMachine) {
						if (err) return console.error(err);
						console.log("washingMachine created:");	
						console.log(washingMachine);
					});
				});
			});
		};
	});
});