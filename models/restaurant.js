var	mongoose = require( 'mongoose' )


//creates restaurant Schema
var restaurantSchema = new mongoose.Schema( {
	_id: Number,
	zomato_id : Number,
	location: [{
			latitude: Number,
			longitude: Number
		}],
	name: String,
  overall_rating : Number,
	greasy_rating: Number,
	tex_mex_rating: Number,
	artisanal_rating: Number
} )


//exports restaurant mongoose model
var Restaurant = mongoose.model( 'Restaurant', restaurantSchema )


//exports constructor function to be used in controller
module.exports = Restaurant
