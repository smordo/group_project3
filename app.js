var express 	= require('express'),
	path 		= require('path'),
	app 		= express(),
	morgan		= require('morgan'),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	port 		= process.env.PORT || 3000,



app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port)
console.log('server running on port' + port)
