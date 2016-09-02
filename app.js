
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , User = require('./model/users')
  , Student = require('./model/students')
  , Alumni = require('./model/alumni')
  , url = require('url')
  , bcrypt = require('bcryptjs')
  , SALT_FACTOR = 10
  , Counter = require('./model/counters')
 , connect = require('connect');


var app = express();
var db = null;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://127.0.0.1:27017/college');
  
}


app.get('/', function(req,res){
	res.send('ok');

	merge= require('merge');
	var a={ one: "hello" };
    var b={ two: "world"};
    console.log('a:'+a);
    console.log('b:'+b);
    
	var c=merge(a, b );
	console.log(c); // {"one": "hello", "two": "world"}
	console.log(merge(a, b ));
});



app.get('/users', function(req,res){
	// call the built-in save method to save to the database
	User.find({}, function(err, users) {
		  if (err) throw err;
		  // object of all the users
		  res.send(users);
//		  console.log(users);
		});
});

app.get('/show', function(req,res){
	res.send('Welcome!');
});

app.get('/users/:userid', function(req,res){

	var Person=Student;

	
	Person.findOne({ userid: req.params.userid }, function(err, person) {
	  if (err) throw err;
	  res.send(person);
//	  console.log(person);
	});
});



//app.get('/login', login);

var login = require('./routes/login')(app);
var add = require('./routes/add')(app);
var review = require('./routes/review')(app);
var posts = require('./routes/posts')(app);
var find = require('./routes/find')(app);
//var route = require('./routes/gcmroutes')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
