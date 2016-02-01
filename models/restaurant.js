var	mongoose = require( 'mongoose' )


//creates restaurant Schema

var restaurantSchema = new mongoose.Schema( {
	zomato_id : Number,
	name: { type : String, required : true },
  	overall_rating : { type: Number, required: true},
	greasy_rating: {type: Number, required: true},
	tex_mex_rating: {type: Number, required: true},
	artisanal_rating: {type: Number, required: true},
	review: String
} )


//pushes create function along after API call and matching
restaurantSchema.pre("save", function(next){
	console.log("this is", this)
	next()
})
//exports restaurant mongoose model
var Restaurant = mongoose.model( 'Restaurant', restaurantSchema )


//exports constructor function to be used in controller
module.exports = Restaurant
