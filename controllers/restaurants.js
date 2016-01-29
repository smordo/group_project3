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
		res.render('restaurantViews/new')
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
		//get zomato and save to local id
	zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResults = JSON.parse(body)
			console.log("zomato results are " + zomatoResults)
			var zid = zomatoResults.restaurants[0].restaurant.R.res_id
			console.log('zid is ' + zid)
			restaurant.zomato_id = zid
			restaurant.save(function(error) {
				if(error) throw error
				res.redirect('/restaurants')
			});
			console.log("the restaurant is ", restaurant)

	})


 }


// GET ONE
function show(req, res) {
	var id = req.params.id;
	Restaurant.findOne( {zomato_id: id}, function(error, restaurant ) {
		if(error) console.log(error);
		zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResult = JSON.parse(body)
			res.render( 'restaurantViews/show', {restaurant: restaurant, result: zomatoResult});
			})


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
