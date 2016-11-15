var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var config = require('./config/config.js');

//Routes
var ro = {
	accMeasurements:	require('./route/accelerometer_measurement.js')
};

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.listen(4567);	

//accMeasurement routes
app.get('/accmeasurement/listAll', ro.accMeasurements.listAll);


console.log('Simple static server listening on port 4567');

