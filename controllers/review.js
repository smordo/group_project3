var Review = require('../models/review.js')

function create(req, res){
	var review = new Review();

	review.overallRating = req.body.overall_rating;
	review.greasyRating = req.body.greasy_rating;
	review.texMexRating = req.body.tex_mex_rating;
	review.artisanalRating = req.body.artisanal_rating;

	review.save(function(error) {
		if(error) res.json( {message: 'Could not create review'});
		res.redirect('/restaurants')
	})
}

function update(req, res) {
	var id = req.params.id;
	Review.findById({_id: id}, function(error, review) {
		if(error) res.json({message: 'Could not find review'});

		if(req.body.overall_rating) review.overall_rating = req.body.overall_rating;
		if(req.body.greasy_rating) review.greasy_rating = req.body.greasy_rating;
		if(req.body.tex_mex_rating) review.tex_mex_rating = req.body.tex_mex_rating;
		if(req.body.artisanal_rating) review.artisanal_rating = req.body.artisanal_rating;

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
	create: create,
	update: update,
	remove: remove

}