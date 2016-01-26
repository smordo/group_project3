var	mongoose = require( 'mongoose' )

var restaurantSchema = new mongoose.Schema( {
	zomato_id : Number,
	overall_rating : Number,
	greasy_rating: Number,
	tex_mex_rating: Number,
	artisanal_rating: Number
} )

module.exports = mongoose.model( "Restaurant", restaurantSchema )
