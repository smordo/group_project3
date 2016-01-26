var mongoose = require( 'mongoose' )

//creates review Schema
var reviewSchema = new mongoose.Schema({
        review_id: Number, 
        overall_rating : Number,
      	greasy_rating: Number,
      	tex_mex_rating: Number,
      	artisanal_rating: Number
        })

//exports review mongoose model
var Review = mongoose.model( 'Review', reviewSchema )

//exports constructor function to be used in controller
module.exports = Review