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
