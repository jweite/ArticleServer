// Set up our Express app object
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Article = require('./api/models/articleModel'),
  bodyParser = require('body-parser');

// Set up Mongoose  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Articledb'); 

// Add middleware func to always insert response headers that make browser xmlHttpReq CORS security happy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add middleware funcs to automatically parse certain types of request bodies.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Plug our app-defined route into Express
var routes = require('./api/routes/articleRoutes');
routes(app);

// Begin...
app.listen(port);
console.log('article list RESTful API server started on: ' + port);
