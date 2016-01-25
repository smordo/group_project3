var	mongoose = require( 'mongoose' )

var userSchema = new mongoose.Schema( {
	firstName : String,
	email : String,
} )

module.exports = mongoose.models( "User", userSchema )

