var	mongoose = require( 'mongoose' )

var reviewSchema = new mongoose.Schema({
        overall_rating : Number,
      	greasy_rating: Number,
      	tex_mex_rating: Number,
      	artisanal_rating: Number,
        })

module.exports = mongoose.model( "Review", reviewSchema )
