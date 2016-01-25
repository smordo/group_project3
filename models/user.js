var	mongoose = require( 'mongoose' );
var bcrypt   = require('bcrypt-nodejs');

//creates user Schema
var userSchema = new mongoose.Schema( {
	firstName : String,
	email : String,
} )


















//exports User mongoose model
module.exports = mongoose.models( "User", userSchema )
