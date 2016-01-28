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

	 User.findById(id, function(error, users) {
   		 if (error) {
	      res.send('Could not find user b/c: ' + error);
	    }
	    console.log("GET REQUEST FOR ONE DOCUMENT");
	    console.log(users);
	    res.render('../views/users/show', {
	      users: users
	    });
	  });

	
};

//GET edit
function editUser(request, response) {
  var id = request.params.id;
  User.findById(id, function(err, users) {
    response.render('../views/users/edit', {
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
function destroyUser(request, response) {
  var id = request.params.id;
  console.log('DELETE REQUEST RECEIVED');
  User.remove({
    _id: id
  }, function(error) {
    if (error) {
      response.send('Could not delete user due to: ' + error);
    }
    response.redirect('/users');
  });
}


module.exports = {
	getIndex: getIndex,
	getUser: getUser,
	editUser: editUser,
	destroyUser: destroyUser
}