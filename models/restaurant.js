var	mongoose = require( 'mongoose' )


//creates restaurant Schema

var restaurantSchema = new mongoose.Schema( {
	zomato_id : Number,
	name: String,
  	overall_rating : Number,
	greasy_rating: Number,
	tex_mex_rating: Number,
	artisanal_rating: Number,
	review: String
} )



restaurantSchema.pre("save", function(next){
	console.log("this is", this)
	next()
})
//exports restaurant mongoose model
var Restaurant = mongoose.model( 'Restaurant', restaurantSchema )


//exports constructor function to be used in controller
module.exports = Restaurant
