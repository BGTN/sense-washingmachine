var util = require('util');

var async = require('async');

var SensorTag = require('./index');

var USE_READ = true;

var db = require('./config/mongo_database.js');

var exec = require('child_process').exec,
        child;

console.log("Turn on the sensortag.");

SensorTag.discoverById("247189c13287", function(sensorTag) {
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
			var x1 = 0.0;
			var y1 = 0.0;
			var z1 = 0.0;
			var countOn = 0;
			var countOff = 0;
			setInterval(function() {
				sensorTag.readAccelerometer(function(error, x, y, z) {
					// save new accMeasurementEntry
					var accMeasurementEntry = new db.accMeasurementModel({
						x : x,
						y : y,
						z : z
					});

					var change = Math.pow((x - x1),2) + Math.pow((y-y1),2) + Math.pow((z-z1),2);

					if(change > .03) {
						countOn++;
						countOff = 0;
					} else {
						countOn = 0;
						countOff++;
					}

					if(countOff == 5) {
						
						// change status of washingMachine to off (running: false); currently only one machine supported
						db.washingMachineModel.find(function(err, washingMachines) {
							if (err) {
								console.log(err);
							} else {
								washingMachines.forEach(function(wm){
									// if the status of the washing machine was "running" (running == true), the status should be updated to false and the sms sent 
									if (wm.running == true) {
										db.washingMachineModel.update({
											_id: wm._id
											},
											{running: false},
											function(err, wmu){
												if(err) {
													console.log(err);
												} else {
												console.log("status of washingmachine turned off");
												
												// send sms that washing machine is done
												
												child = exec('node ./alert.js',
												  function (error, stdout, stderr) {
												    console.log('stdout: ' + stdout);
												    console.log('stderr: ' + stderr);
												    if (error !== null) {
												      console.log('exec error: ' + error);
												    }
												});}
											});
									}
								});
							}
						});


					}
					
					//if the washingMachine is on, change status of washingMachine to wm.running = true
					if (countOn > 2) {
						// change status of washingMachine to on (running: true); currently only one machine supported
						db.washingMachineModel.find(function(err, washingMachines) {
							if (err) {
								console.log(err);
							} else {
								washingMachines.forEach(function(wm){
									// if the status of the washing machine was "running" (running == true), the status should be updated to true 
									if (wm.running == false) {
										db.washingMachineModel.update({
											_id: wm._id
											},
											{running: true, starttime: new Date()},
											function(err, wmu){
												if(err) {
													console.log(err);
												} else {
												console.log("status of washing machine turned on");
												}
											});
									}
								});
							}
						});						
					}
					// print washingMachine for test reasons
					db.washingMachineModel.find(function(err, washingMachines) {
						if(err) {
							console.log(err);
						} else {
							console.log(washingMachines);
						}
					});

					console.log("Change: " + change);
					console.log("Count On: " + countOn);
					console.log("Count Off: " + countOff);
					
					x1 = x;
					y1 = y;
					z1 = z;

					accMeasurementEntry.save(function(err, accMeasurement) {
						if (err){
							return console.error(err);
						} else {
							console.log("accMeasurement created");
							console.log("-----------------------")
							db.accMeasurementModel.find(function(err, accMeasurements) {
								if (err)
									return console.error(err);
								console.log(accMeasurements);
							});
						}
					});

					console.log('\tx = %d G', x.toFixed(1));
					console.log('\ty = %d G', y.toFixed(1));
					console.log('\tz = %d G', z.toFixed(1));

				});

			}, 3000);

		}
		]);
});
