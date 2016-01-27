var mongoose = require( 'mongoose' );
var bcrypt   = require('bcrypt-nodejs');

//creates user Schema
var userSchema = new mongoose.Schema( {
	local: {
		firstName : String,
		email : String,
		password: String
	}
} )

//hashes password
userSchema.methods.encrypt = function(password) {
  	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


//compare password with stored local/hashed password 
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


//exports User mongoose model
var User = mongoose.model( 'User', userSchema )


//exporting constructor function to be used in controller
module.exports = User
