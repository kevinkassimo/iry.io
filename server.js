const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash'); // Used for flash message if login failure encountered
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');

/***** CONFIGURE *****/
var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('views', __dirname + '/views'));  

// Static
app.use('/public/blog', express.static('public/blog'));
app.use('/public/home', express.static('public/home'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session(require('./config/blog/session.js')));

// Database
var blogDB = require('./config/blog/database.js');
mongoose.connect(blogDB.url);
var db = mongoose.connection;
db.on('error', function() {});
db.once('open', function() {});

// Setup Passport.js
(require('./config/blog/passport.js'))(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/***** ROUTING *****/
(require('./app/blog/blog-router.js'))(app, passport);


/***** WRAP UP *****/
app.listen(port);

