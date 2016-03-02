var Restaurant = require('../models/restaurant.js')

function index( req, res ) {
	Restaurant.find( function( error, restaurants ) {
		if ( error ) res.json( { message: "Could not find restaurants" } )
		console.log(restaurants)
		res.json(restaurants);
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
		res.json( {message: 'Created restaurant'})
	});
}

function show(req, res) {
	var zomato_id = req.params.zomato_id;

	Restaurant.findOne( {zomato_id: zomato_id}, function(error, restaurant ) {
		console.log(zomato_id);
		if(error) console.log(error)
		res.json(restaurant);

	})
}

function update(req, res) {
	var id = req.params.zomato_id;
	Restaurant.findOne({zomato_id: id}, function(error, restaurant) {
		if(error) res.json({message: 'Could not find restaurant'});

		if(req.body.overall_rating) restaurant.overall_rating = req.body.overall_rating;
		if(req.body.greasy_rating) restaurant.greasy_rating = req.body.greasy_rating;
		if(req.body.tex_mex_rating) restaurant.tex_mex_rating = req.body.tex_mex_rating;
		if(req.body.artisanal_rating) restaurant.artisanal_rating = req.body.artisanal_rating;
		if(req.body.review) restaurant.review = req.body.review;


		restaurant.save(function(error) {
			if(error) res.json({ message: 'Could not update restaurant'});

			res.json({message: 'Updated restaurant!'});
		})
	})
}

function remove(req, res) {
	var zomato_id = req.params.zomato_id;

	Restaurant.remove({zomato_id: zomato_id}, function(error) {
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
