var express 		 = require('express'),
	path 			 = require('path'),
	app 			 = express(),
	morgan			 = require('morgan'),
	bodyParser 		 = require('body-parser'),
	mongoose 		 = require('mongoose'),
	userRouter  	 = require('./config/routes/userRoutes.js'),
	restaurantRouter = require('./config/routes/restaurantRoutes.js')
	port 			 = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/users', userRouter)
app.use('/restaurants', restaurantRouter)


app.set( 'views', path.join( __dirname, 'views' ) )
app.engine( 'ejs', require( 'ejs' ).renderFile )
app.set( 'view engine', 'ejs' )

app.listen(port) 
console.log('server running on port' + port)