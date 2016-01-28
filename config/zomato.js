request  = require('request')

module.exports = {
	searchString: {
		url: "https://developers.zomato.com/api/v2.1/search?entity_id=10977&entity_type=city&cuisines=73",
		headers: {
			'user_key' : '2a79f98bfb5e1995d57265c38965203c'
		}
	},

	getRestaurants: function(callback){
		request(this.searchString, callback)
	}
}