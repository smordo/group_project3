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
	console.log( "Body is ", req.body )
	var restaurant = new Restaurant();

	restaurant.overall_rating = req.body.overall_rating;
	restaurant.greasy_rating = req.body.greasy_rating;
	restaurant.tex_mex_rating = req.body.tex_mex_rating;
	restaurant.artisanal_rating = req.body.artisanal_rating;
		//get zomato and save to local id
	zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResults = JSON.parse(body)
			console.log("zomato results are " + zomatoResults)
			var zid = req.body.zomato_id
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
	Restaurant.find( {zomato_id: id}, function(error, restaurants ) {
		if(error) console.log(error);
		// var restaurants = restaurants;
		zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResult = JSON.parse(body)

			var totalOverall= 0;
			var totalGreasy= 0;
			var totalArtisanal= 0;
			var totalTexMex= 0;
			var restaurantCount= 0;
			// console.log("restaurants before the loops are", restaurants)
			// var restaurantsj = JSON.parse(restaurants)
			restaurants.forEach(function(r){

			for(var i=0; i< restaurants.length; i++) {
					// if (restaurants[i].zomato_id === id) {
									restaurantCount++;
									totalOverall += restaurants[i].overall_rating;
									totalGreasy += restaurants[i].greasy_rating;
									totalArtisanal += restaurants[i].artisanal_rating;
									totalTexMex += restaurants[i].tex_mex_rating;
					};
			})
			console.log("overall total", totalOverall)
			console.log("greasy total", totalGreasy)
			console.log("rest count", restaurantCount)

			var avgOverall = (totalOverall/restaurantCount);
			var avgGreasy= (totalOverall/restaurantCount);
			var avgArtisanal = (totalOverall/restaurantCount);
			var avgTexMex = (totalOverall/restaurantCount);
			res.render( 'restaurantViews/show', {restaurant: restaurants[0], result: zomatoResult, avgOverall:avgOverall, avgGreasy:avgGreasy, avgArtisanal:avgArtisanal, avgTexMex:avgTexMex});
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
