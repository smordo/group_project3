var Restaurant = require('../models/restaurant.js')

function index( req, res ) {
	Restaurant.find( function( error, restaurants ) {
		if ( error ) res.json( { message: "Could not find restaurants" } )
		res.render( 'map', ( { restaurants: restaurants }))
	})
}

function show(req, res) {
	var id = req.params.id;

	Restaurant.findById( {_id: id}, function(error, restaurant ) {
		if(error) console.log(error)
		res.json({restaurant: restaurant});

	})
}

module.exports = {
	index: index,
	show: show
}