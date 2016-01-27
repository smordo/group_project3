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
  response.render('./restaurants/new', {
    title: "Create New Restaurant"
  });
}

//CREATE
function create(req, res){
	var restaurant = new Restaurant();

	restaurant.name = req.body.name;
	restaurant.reviews.overall_rating = req.body.overall_rating;
	restaurant.reviews.greasy_rating = req.body.greasy_rating;
	restaurant.reviews.texMex_rating = req.body.tex_mex_rating;
	restaurant.reviews.artisanal_rating = req.body.artisanal_rating;

	restaurant.save(function(error) {
		if(error) res.json( {message: 'Could not create review'});
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
	Review.findById({_id: id}, function(error, review) {
		if(error) res.json({message: 'Could not find review'});

		if(req.body.overall_rating) reviews.overall_rating = req.body.overall_rating;
		if(req.body.greasy_rating) reviews.greasy_rating = req.body.greasy_rating;
		if(req.body.tex_mex_rating) reviews.tex_mex_rating = req.body.tex_mex_rating;
		if(req.body.artisanal_rating) reviews.artisanal_rating = req.body.artisanal_rating;

		review.save(function(error) {
			if(error) res.json({ message: 'Could not update review'});

			res.json({message: 'Updated review!'});
		})
	})
}

function remove(req, res) {
	var id = req.params.id;

	Review.remove({_id: id}, function(error) {
		if(error) res.json({message: 'Could not delete review'});

		res.json({message: 'Review successfully deleted!'});
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
