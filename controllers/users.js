var User = require('../models/user.js');


// GET INDEX

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
function updateUser(request, response) {
	  var id = request.params.id;


	  User.findById(id, function(error, users) {
	    if (error) {
	      response.send('Could not find user b/c:' + error);
	    }
	    console.log('PUT REQUEST RECEIVED');
	    console.log(users);
	    users.local.email = request.body.email;
	    users.local.password = request.body.password;
	    users.save(function(error) {
	      if (error) {
	        response.send('Could not update user b/c:' + error);
	      }
	      response.redirect('/restaurants');
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
    response.redirect('/passport/signup');
  });
}


module.exports = {
	getIndex: getIndex,
	getUser: getUser,
	editUser: editUser,
	destroyUser: destroyUser,
	updateUser: updateUser
}