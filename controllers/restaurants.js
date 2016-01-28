var Restaurant = require('../models/restaurant.js'),
	zomato = require('../config/zomato.js')

function index( req, res ) {
	Restaurant.find( function( error, restaurants ) {
		if ( error ) res.json( { message: "Could not find restaurants" } )
		console.log(restaurants)
		zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResults = JSON.parse(body)
			res.render( 'restaurantViews/index', {restaurants: restaurants, results: zomatoResults});
		})
	})
}

// GET NEW FORM
function newRestaurant(req, res) {
  	console.log("FORM RENDERED FOR NEW DOCUMENT");
  	res.render('../views/restaurantViews/new', {
    title: "Create New Restaurant"
  });
}

// CREATE
function create(req, res){
	var restaurant = new Restaurant();

	restaurant.name = req.body.name;
	restaurant.overall_rating = req.body.overall_rating;
	restaurant.latitude = req.body.latitude;
	restaurant.longitude = req.body.longitude;
	restaurant.greasy_rating = req.body.greasy_rating;
	restaurant.tex_mex_rating = req.body.tex_mex_rating;
	restaurant.artisanal_rating = req.body.artisanal_rating;

	restaurant.save(function(error) {
		if(error) throw error
		res.redirect('/restaurants')
	});
}

// GET ONE
function show(req, res) {
	var name = req.params.name;
	Restaurant.findOne( {name: name}, function(error, restaurant ) {
		console.log(name);
		if(error) console.log(error)

		res.render('../views/restaurantViews/show', ({restaurant: restaurant}));

	})
}

//GET FORM TO EDIT
function edit(req, res) {
	var name = req.params.name;
	Restaurant.findOne( {name: name}, function(error, restaurant ) {
    res.render('../views/restaurantViews/edit', ({
      restaurant:restaurant
    }));
  });
}


//SUBMIT PUT
function update(req, res) {
	var name = req.params.name;
	Restaurant.findOne({name: name}, function(error, restaurant) {
		if(error) res.json({message: 'Could not find restaurant'});
		console.log('PUT REQUEST RECEIVED');
    console.log(restaurant);
		restaurant.name = req.body.name;
	  restaurant.latitude = req.body.latitude;
		restaurant.longitude = req.body.longitude;
		restaurant.overall_rating = req.body.overall_rating;
		restaurant.greasy_rating = req.body.greasy_rating;
		restaurant.tex_mex_rating = req.body.tex_mex_rating;
		restaurant.artisanal_rating = req.body.artisanal_rating;

		restaurant.save
					(function(error) {
			if(error) console.log( "could not update skateboard b/c " + error )
			res.redirect('/restaurants')
		});
	})
}

//DESTROY ONE
function remove(req, res) {
	var name = req.params.name;

	Restaurant.remove({name: name}, function(error) {
		if(error) res.json({message: 'Could not delete restaurant'});
		// res.redirect('/restaurants');
		console.log("restaurant removed")
	})
}

module.exports = {
	index: index,
	newRestaurant: newRestaurant,
	create: create,
	edit:edit,
	show: show,
	update: update,
	remove: remove
}
