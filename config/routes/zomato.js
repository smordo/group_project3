var express = require('express'),
	zomato 	  = express.Router(),
	request  = require('request')

zomato.get('/', function(req, res) {
	var searchString = {
		url: "https://developers.zomato.com/api/v2.1/search?entity_id=10977&entity_type=city&cuisines=73",
		headers: {
			'user_key' : '2a79f98bfb5e1995d57265c38965203c'
		}
	} 

	function callback(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode);
	        res.send(body);
		}
	} 

	request(searchString, callback) 
})

module.exports = zomato