# Sense your washingmachine!
Sense the status of your washing machine with a TI CC2650 Sensor Tag and the MEAN Stack. Display the remaining time until your washing machine is done. If the washing-machine is done, a SMS will be sent to your phone.

# Resources
- Raspberry Pi 3 Model B
- Texas Instruments CC2650 Sensor Tag

# Requirements
- Node.js lib for the TI Sensor Tag https://github.com/sandeepmistry/node-sensortag 
- MEAN STACK:
  - Node.js
  - Express
  - MongoDB
- npm install in sense-washingmachine/
- bower install in sense-washingmachine/public *todo* add .package file for bower?

# High-Level Overview
- The TI CC2650 Sensor Tag has an accelerometer sensor which is attached to the washing machine
- Raspberry Pi 3.0
  - Node server
  - MongoDB
  - AngularJS
- Every x seconds accelerometer data is requested from the node server at the Pi
  - For each measurement a new entry of accelerometer is saved in the MongoDB
  - If there are significant divergences in the acc measurements, the status of the washing machine is updated to running; if there are no significant divergences the status of the washing machine is updated to false
  - If the status of the washing machine turns from running to not running, a SMS is sent to the users phone
- At the website the $scope is updated every x seconds and so the status of the washing machines are updated

# Start
1.	find out IP-address
2.	in public/app/app.js change the options.api.base_url to the current ip address
3.	start mongodb with “sudo mongod” in a terminal on the raspberry pi
..* If an error like “unclean shutdown detected occurs” execute cmd “sudo mongod --repair”
4.	start to sense data from the sensor: “sudo node startSensing.js”
5.	start the webserver: “sudo node server.js”
6.	the website can be viewed in the browser at “http://*ip address*:4567

1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.
