var User = require('../models/user.js');

//GET show

function getUser(req, res) {
	var id = req.params.id;

	User.findById(id, function( error, dbResponse) {
		if(error) {
			res.send('Could not find user')
		}
		console.log('Get Request for user');
		console.log(dbResponse);
		res.render('../views/users/show', {
			title: "User index",
			users: dbResponse
		});
	})
}


function editUser(req, res) {
	var id = req.params.id;
	User.findById(id, function(err, dbResponse) {
		res.render('../views/users/edit', {
			users: dbResponse
		})
	})
}

module.exports = {
	getUser: getUser,
	editUser: editUser
}