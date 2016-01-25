var Restaurant = require('..models/restaurant.js')

function show(req, res) {
	var id = req.params.id;

	Restaurant.findById( {_id: id} function(error, restaurant ) {
		if(error) console.log(error)
		res.json({restaurant: restaurant});

	})
}

module.exports = {
	show: show
}