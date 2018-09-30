var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

// mlab connection 
const mongoUri = "mongodb://Tyquan:Jamela17!@ds113703.mlab.com:13703/paragon";
// mongoose mlab connection
mongoose.connect(mongoUri, {
  useMongoClient: true
});
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var staticRouter = require('./routes/static');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

app.use(compression({level: 1}));
app.use(cors());
//app.use(favicon(path.join(__dirname, 'public', 'images/weemaple2.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: "hf94*(9ywrhfq7rfgwb72^9@@28y3qex182ehdud%(@%32eg",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180 * 60 * 1000 }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/static', staticRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
