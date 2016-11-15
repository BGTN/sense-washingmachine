var db = require('../config/mongo_database.js');
var config = require('../config/config.js');

exports.listAll = function(req, res) {
	
	db.washingMachineModel.find(function (err, washingMachines) {
		if (err) {
			return res.sendStatus(400);
		};
		return res.status(200).json(washingMachines);
		// console.log(accMeasurements);
	})

};