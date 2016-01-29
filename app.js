var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path         = require('path');
var ejsLayouts 	 = require('express-ejs-layouts');
var methodOverride = require('method-override');

//routes
var userRoutes = require('./config/routes/userRoutes');
var passportRoutes 	= require('./config/routes/passportRoutes');
var restaurantRoutes = require('./config/routes/restaurantRoutes');
var apiRoutes = require('./config/routes/apiRoutes');
var zomato = require('./config/routes/zomato')

//connect to mongodb via mongoose
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/burrito-app';
mongoose.connect(mongoUri);

//middleware for logger and parsers
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

//set EJS for the views
app.use(ejsLayouts)
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

//method override
app.use(methodOverride('_method'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//passport and sessions
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// This middleware will allow us to use the current user in the layout
app.use(function (req, res, next) {
  global.user = req.user;
  next()
});

app.get( '/', function(req, res){
	res.redirect('/restaurants')
});
app.use('/users', userRoutes);
app.use('/passport', passportRoutes);
app.use( '/restaurants', restaurantRoutes);
app.use('/api', apiRoutes);
app.use('/zomato', zomato);


app.listen(process.env.PORT || 3000 )
