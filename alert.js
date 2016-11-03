var twilio = require('twilio');

function convertHour(hour){
	var temp = hour - 5;
	if(temp > 12) {
		temp = temp - 12;
	}
	if(temp < 0){
		temp = temp + 12
	}
	return temp

}

var d = new Date();
var h = d.getHours();
var hour = convertHour(h);
var m = d.getMinutes();


var client = new twilio.RestClient('ACccfd0901ab50c6a32d68ba536e401440', '936374d806adbef0cfb029f1a863a03b');
 
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.sms.messages.create({
    to:'+12035779892',
    from:'12038197406',
    body:'Your laundry is done. ' + ' Time: ' +hour + ':' + m
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
	console.log(error)
        console.log('Oops! There was an error.');
    }
});

