var db = require('../config/mongo_database.js');
var config = require('../config/config.js');

exports.listAll = function(req, res) {
	
	db.accMeasurementModel.find(function (err, accMeasurements) {
		if (err) {
			return res.sendStatus(400);
		};
		return res.status(200).json(accMeasurements);
		// console.log(accMeasurements);
	})

};