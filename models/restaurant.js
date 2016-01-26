var	mongoose = require( 'mongoose' )

var restaurantSchema = new mongoose.Schema( {
	_id: Number,
	zomato_id : Number,
	location: [{
				latitude: Number,
				longitude: Number
				}]
	name: String,
	reviews: [reviewSchema]
} )

module.exports = mongoose.model( "Restaurant", restaurantSchema )
