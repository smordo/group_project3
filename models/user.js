var	mongoose = require( 'mongoose' );
var bcrypt   = require('bcrypt-nodejs');

//creates user Schema
var userSchema = new mongoose.Schema( {
	firstName : String,
	email : String,
	password: String
} )

//hashes password
User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


//compare password with stored local/hashed password 
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


//exports User mongoose model
module.exports = mongoose.models( "User", userSchema )
