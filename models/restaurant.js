var	mongoose = require( 'mongoose' )
var reviewSchema = require('./review')


//creates restaurant Schema
var restaurantSchema = new mongoose.Schema( {
	_id: Number,
	zomato_id : Number,
	location: [{
			latitude: Number,
			longitude: Number
		}],
	name: String,
	reviews: [reviewSchema]
} )


//exports restaurant mongoose model
var Restaurant = mongoose.model( 'Restaurant', restaurantSchema )


//exports constructor function to be used in controller
module.exports = Restaurant
