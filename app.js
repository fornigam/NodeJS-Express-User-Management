var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
//app.use(express.static(__dirname + '/templateLogReg'));
app.use(express.static(path.join(__dirname, 'template')));
// include routes
var routes = require('./routes/router');
app.use('/', routes);



//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testForAuth', { useNewUrlParser: true });
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected');
});


app.use(session({secret: 'your secret', saveUninitialized: true, resave: false}));

// listen on port 3000
app.listen(3000, function () {
    console.log('Express app listening on port 3000');
  });