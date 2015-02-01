var express = require('express')
var moment = require('moment')

var app = express()

app.use(express.static(__dirname + '/static'));

numSensors = 20
sensorLocations = {
	1: [10,10],
	2: [20,20],
	3: [30,30],
	4: [40,40],
	5: [50,50],
	6: [60,60],
	7: [70,70],
	8: [80,80],
	9: [90,90],
	10: [100,100],
	11: [110,110],
	12: [120,120],
	13: [130,130],
	14: [140,140],
	15: [150,150],
	16: [160,160],
	17: [170,170],
	18: [180,180],
	19: [190,190],
	20: [200,200]
}

app.get('/locations', function (req, res) {
	res.send(sensorLocations)
})

/* Get occupancy data
   Expects a date query string parameter with a date in ISO 8601 format, e.g. 2015-01-26T16:00
   Returns JSON data for that time period
*/   
app.get('/occupancy', function (req, res) {
	if (!req.query.date) {
		res.status(500).send({ error: 'Parameter date not passed.'});
		return;
	}
	date = moment(req.query.date)
	if(!date) {
		res.status(500).send({ error: 'Invalid date: ' + req.query.date});
		return;
	}
	val = (date.hours() * 4) + Math.floor(date.seconds() / 15);
	data = {}
	data.date = date.toJSON()
	data.values = {}
	for (i = 0; i < numSensors; i++) {
		data.values[i] = val
	}
	res.send(data)
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Wireless Sensor Network App listening at port %s', port)

})
