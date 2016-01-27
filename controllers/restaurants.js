var Restaurant = require('../models/restaurant.js')

function index( req, res ) {
	Restaurant.find( function( error, restaurants ) {
		if ( error ) res.json( { message: "Could not find restaurants" } )
		console.log(restaurants)
		res.render( '../views/restaurantViews/index', ( {restaurants: restaurants}));
	})
}

// GET
function newRestaurant(request, response) {
  console.log("FORM RENDERED FOR NEW DOCUMENT");
  response.render('../views/restaurantViews/new', {
    title: "Create New Restaurant"
  });
}

//CREATE
function create(req, res){
	var restaurant = new Restaurant();

	restaurant.name = req.body.name;
	restaurant.overall_rating = req.body.overall_rating;
	restaurant.greasy_rating = req.body.greasy_rating;
	restaurant.texMex_rating = req.body.tex_mex_rating;
	restaurant.artisanal_rating = req.body.artisanal_rating;

	restaurant.save(function(error) {
		if(error) res.json( {message: 'Could not create restaurant'});
		res.redirect('/restaurants')
	});
}

function show(req, res) {
	var name = req.params.name;

	Restaurant.findOne( {name: name}, function(error, restaurant ) {
		console.log(name);
		if(error) console.log(error)

		res.render('../views/restaurantViews/show', ({restaurant: restaurant}));

	})
}

function update(req, res) {
	var id = req.params.id;
	Restaurant.findById({_id: id}, function(error, restaurant) {
		if(error) res.json({message: 'Could not find restaurant'});

		if(req.body.overall_rating) restaurant.overall_rating = req.body.overall_rating;
		if(req.body.greasy_rating) restaurant.greasy_rating = req.body.greasy_rating;
		if(req.body.tex_mex_rating) restaurant.tex_mex_rating = req.body.tex_mex_rating;
		if(req.body.artisanal_rating) restaurant.artisanal_rating = req.body.artisanal_rating;

		restaurant.save(function(error) {
			if(error) res.json({ message: 'Could not update restaurant'});

			res.json({message: 'Updated review!'});
		})
	})
}

function remove(req, res) {
	var id = req.params.id;

	Restaurant.remove({_id: id}, function(error) {
		if(error) res.json({message: 'Could not delete restaurant'});

		res.json({message: 'Restaurant successfully deleted!'});
	})
}

module.exports = {
	index: index,
	newRestaurant: newRestaurant,
	show: show,
	create: create,
	update: update,
	remove: remove
}
