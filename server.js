var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash'); // Used for flash message if login failure encountered
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var exphbs = require('')

var app = express();
app.use('view engine')