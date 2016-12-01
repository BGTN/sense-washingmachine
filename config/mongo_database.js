var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/washdb';

//add MAC addresses of sensor tags here
var macAddressesOfSensorTags = [
	{
		mac: "Mac Address 1",
		title: "2"
	},
	{
		mac: "Mac Address 2",
		title: "1"
	}];

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
	title: { type: String },
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
				macAddressesOfSensorTags.forEach(function(washingMachine) {
					var washingMachineEntry = new WashingMachineModel({
						mac: washingMachine.mac,
						title: washingMachine.title
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