var util = require('util');

var async = require('async');

var SensorTag = require('./index');

var USE_READ = true;

var db = require('./config/mongo_database.js');

console.log("Turn on the sensortag.");

SensorTag.discover(function(sensorTag) {
	console.log('discovered: ' + sensorTag);

	sensorTag.on('disconnect', function() {
		console.log('disconnected!');
		process.exit(0);
	});

	async.series([
	function(callback) {
		console.log('connectAndSetUp');
		sensorTag.connectAndSetUp(callback);
	},
	function(callback) {
		console.log('readDeviceName');
		sensorTag.readDeviceName(function(error, deviceName) {
			console.log('\tdevice name = ' + deviceName);
			callback();
		});
	},
	function(callback) {
		console.log('readSystemId');
		sensorTag.readSystemId(function(error, systemId) {
			console.log('\tsystem id = ' + systemId);
			callback();
		});
	},
	function(callback) {
		console.log('readSerialNumber');
		sensorTag.readSerialNumber(function(error, serialNumber) {
			console.log('\tserial number = ' + serialNumber);
			callback();
		});
	},
	function(callback) {
		console.log('enableAccelerometer');
		sensorTag.enableAccelerometer(callback);
	},
	function(callback) {
		setTimeout(callback, 2000);
	},
	function(callback) {
		if (USE_READ) {
			console.log('readAccelerometer');

			setInterval(function() {
				sensorTag.readAccelerometer(function(error, x, y, z) {
					// save new accMeasurementEntry
					var accMeasurementEntry = new db.accMeasurementModel({
						x : x,
						y : y,
						z : z
					});

					accMeasurementEntry.save(function(err, accMeasurement) {
						if (err)
							return console.error(err);
						console.log("accMeasurement created");

						db.accMeasurementModel.find(function(err, accMeasurements) {
							if (err)
								return console.error(err);
							console.log(accMeasurements);
						});
					});

					console.log('\tx = %d G', x.toFixed(1));
					console.log('\ty = %d G', y.toFixed(1));
					console.log('\tz = %d G', z.toFixed(1));

					// callback();
				});

			}, 3000);

		} else {
			sensorTag.on('accelerometerChange', function(x, y, z) {
				console.log('\tx = %d G', x.toFixed(1));
				console.log('\ty = %d G', y.toFixed(1));
				console.log('\tz = %d G', z.toFixed(1));
			});

			console.log('setAccelerometerPeriod');
			sensorTag.setAccelerometerPeriod(500, function(error) {
				console.log('notifyAccelerometer');
				sensorTag.notifyAccelerometer(function(error) {
					setTimeout(function() {
						console.log('unnotifyAccelerometer');
						sensorTag.unnotifyAccelerometer(callback);
					}, 5000);
				});
			});
		}
	},
	function(callback) {
		console.log('disableAccelerometer');
		sensorTag.disableAccelerometer(callback);
	},
	function(callback) {
		console.log('disconnect');
		sensorTag.disconnect(callback);
	}]);
});
