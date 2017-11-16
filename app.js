var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var flash = require('express-flash')
//var fileUpload = require('express-fileupload');
//var multer = require('multer')

var index = require('./routes/index');
var users = require('./routes/users');
var public = require('./routes/public');
var member = require('./routes/member');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
                secret: "vidyanusaadministrator",
                resave: false,
                saveUninitialized: true,
                store: new MongoStore({url:''}),
                cookie:{secure:!true}
                }))
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));
//app.use(fileUpload())
app.use(bodyParser.urlencoded({extended: true}));
// app.use(multer({dest:'uploads'}).single('file'))
// app.use(multer({dest:'uploads'}).array('file'))
// app.use(multer({dest:'uploads'}).fields('file'))

//app.use(multer({dest: 'uploads'})); // dest is not necessary if you are happy with the default: /tmp


app.use('/', index);
app.use('/users', users);
app.use('/public', public);
app.use('/member', member);

// flash message
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(function (req, res, next) {
  res.status(404).redirect('/')
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;
