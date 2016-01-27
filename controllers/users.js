var User = require('../models/user.js');


function getIndex(req, res) {
	User.find(function(err, users) {
		if (err) console.log(err)
		console.log(users)
		res.render('../views/users/index', ( {users: users} ) );
	});
};

//GET show

function getUser(req, res) {
	var id = req.params.id;

	User.findById( {_id:id}, function( error, users) {
		if(error) console.log(error)
		res.render('../views/users/show.ejs', {users: users} )
		} )
		
};

//GET edit
function editUser(req, res) {
	var id = req.params.id;
	User.findById(id, function(err, users) {
		res.render('../views/users/edit', {
			users: users
		});
	});
}


//PATCH update
function update(req, res) {
	var id = req.params.id;
	User.findById(id, function(error, users) {
		if (error) {
			res.send("could not find users");
		}
	console.log('Put request recieved');
	console.log(users);
	users.firstName = req.body.firstName;
	users.email = req.body.email;
	users.password = req.body.password;
	users.save(function(error) {
		if (error) {
			res.sed('Could not find user');
		}
		res.redirect('/users');
	});
	});
}

//DELETE destroy
function destroyUser(req, res) {
	var id = req.params.id;
	console.log('Delete request made');
	User.remove( {_id: id}, function (error) {
		if (error) res.send("could not delete user");
	} )
}


module.exports = {
	getIndex: getIndex,
	getUser: getUser,
	editUser: editUser,
	destroyUser: destroyUser
}