var express    			  = require('express'),
	router 	   			  = express.Router(),
	restaurantsController = require('../../controllers/restaurants')

router.route('/')
//GET ALL
	.get(restaurantsController.index)
//CREATE AFTER FORM SUBMISSION
	.post(restaurantsController.create)

router.route('/new')
// GET NEW FORM
	.get(restaurantsController.newRestaurant)

router.route('/:zomato_id')
//GET ONE RESTAURANT
	.get(restaurantsController.show)
//SUBMIT EDIT FORM
	.put(restaurantsController.update)
//REMOVE ONE RESTAURANT
	.delete(restaurantsController.remove)

router.route('/:zomato_id/edit')
//GET EDIT FORM
	.get(restaurantsController.edit)


module.exports = router
