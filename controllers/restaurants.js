var Restaurant = require('../models/restaurant.js'),
	zomato = require('../config/zomato.js')

//find all restaurants
function index( req, res ) {
	Restaurant.find( function( error, restaurants ) {
		if ( error ) res.json( { message: "Could not find restaurants" } )
		console.log(restaurants)
//call to zomato API for all restaurants
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

//pair req.body fields with schema
	restaurant.overall_rating = req.body.overall_rating;
	restaurant.greasy_rating = req.body.greasy_rating;
	restaurant.tex_mex_rating = req.body.tex_mex_rating;
	restaurant.artisanal_rating = req.body.artisanal_rating;
	restaurant.review = req.body.review;
		//get zomato name and id  and save to local id
	zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResults = JSON.parse(body)
			console.log("zomato results are " + zomatoResults)
			var name = req.body.name
			var zid = req.body.zomato_id
			console.log('zid is ' + zid)
			restaurant.name = name
			restaurant.zomato_id = zid
			restaurant.save(function(error) {
				if(error) throw error
				res.redirect('/restaurants/' + restaurant.zomato_id )
			});
			console.log("the restaurant is ", restaurant)
	})
 }


// GET ONE
function show(req, res) {
	var id = req.params.zomato_id;
	Restaurant.find( {zomato_id: id}, function(error, restaurants ) {
		if(error) console.log(error);
		// call to Zomato api
		zomato.getRestaurants(function(error, response, body){
			if(error) return console.log(error)
			var zomatoResult = JSON.parse(body)
			//declare the ratings variables
			var totalOverall= 0;
			var totalGreasy= 0;
			var totalArtisanal= 0;
			var totalTexMex= 0;
			var restaurantCount= 0;


			//count and average the ratings
			for(var i=0; i< restaurants.length; i++) {
									restaurantCount++;
									totalOverall += restaurants[i].overall_rating;
									totalGreasy += restaurants[i].greasy_rating;
									totalArtisanal += restaurants[i].artisanal_rating;
									totalTexMex += restaurants[i].tex_mex_rating;
					};
			console.log("overall total", totalOverall)
			console.log("greasy total", totalGreasy)
			console.log("rest count", restaurantCount)

			var avgOverall = (totalOverall/restaurantCount).toFixed(1);
			var avgGreasy= (totalGreasy/restaurantCount).toFixed(1);
			var avgArtisanal = (totalArtisanal/restaurantCount).toFixed(1);
			var avgTexMex = (totalTexMex/restaurantCount).toFixed(1);
			console.log(restaurantCount)
			console.log(totalGreasy)

			res.render( 'restaurantViews/show', {restaurant: restaurants[0], result: zomatoResult, avgOverall:avgOverall, avgGreasy:avgGreasy, avgArtisanal:avgArtisanal, avgTexMex:avgTexMex});
			})
	})
}

//GET FORM TO EDIT
function edit(req, res) {
	var zomato_id = req.params.zomato_id;
	Restaurant.findOne( {zomato_id: zomato_id}, function(error, restaurant ) {
    res.render('../views/restaurantViews/edit', ({
      restaurant:restaurant
    }));
  });
}


//SUBMIT PUT
function update(req, res) {
	var zomato_id = req.params.zomato_id;
	Restaurant.findOne({zomato_id: zomato_id}, function(error, restaurant) {
		if(error) res.json({message: 'Could not find restaurant'});
		console.log('PUT REQUEST RECEIVED');
    	console.log(restaurant);

		if (req.body.overall_rating) restaurant.overall_rating = req.body.overall_rating;
		if (req.body.greasy_rating) restaurant.greasy_rating = req.body.greasy_rating;
		if (req.body.tex_mex_rating) restaurant.tex_mex_rating = req.body.tex_mex_rating;
		if (req.body.artisinal_rating) restaurant.artisanal_rating = req.body.artisanal_rating;
		if (req.body.review) restaurant.review = req.body.review;

		restaurant.save
					(function(error) {
			if(error) console.log( "could not update restaurant b/c " + error )
			res.redirect('/restaurants')
		});
	})
}

//DESTROY ONE
function remove(req, res) {
	var zomato_id = req.params.zomato_id;
	//search by zomato id and remove
	Restaurant.remove({zomato_id: zomato_id}, function(error) {
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
