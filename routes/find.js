/**
 * New node file
 */
var url = require('url')
	, User = require('../model/users')
	, Counter = require('../model/counters')
	, Student = require('../model/students')
	;
module.exports = function(app) {
	
	app.get('/find', function(req, res) {
		Student.find({}, {name:1, userid:1, branch:1, year:1}).sort({name:1}).exec(function(err,students){
  		  if (err) {
  			  console.i(err);
  			  res.send("Falsexxx:"+err);
  		  }
    		  // object of all the users
    		  res.send(students);
  	});
 });

	app.get('/find/year/:year', function(req, res) {
		yearS=req.params.year;
		Student.find({year:yearS}, {name:1, userid:1, branch:1, year:1}).sort({name:1}).exec(function(err,students){
			 if (err) {
	  			  console.i(err);
	  			  res.send("Falsexxx:"+err);
	  		  }
	    		  // object of all the users
    		  res.send(students);
  	});
 });

app.get('/find/year/:year/:branch', function(req, res) {
	yearS=req.params.year;
	branchS=req.params.branch;
	Student.find({year:yearS, branch:branchS}, {name:1, userid:1, branch:1, year:1}).sort({name:1}).exec(function(err,students){
		 if (err) {
 			  console.i(err);
 			  res.send("Falsexxx:"+err);
 		  }
   	// object of all the users
		  res.send(students);
	});
 });

app.get('/find/branch/:branch', function(req, res) {
	branchS=req.params.branch;
	Student.find({branch:branchS}, {name:1, userid:1, branch:1, year:1}).sort({name:1}).exec(function(err,students){
		 if (err) {
 			  console.i(err);
 			  res.send("Falsexxx:"+err);
 		  }
   		  // object of all the users
		  res.send(students);
	});
 });

app.get('/find/search/:name', function(req, res) {
	nameS=req.params.name;
	Student.find({$or:[{name:{$regex:nameS}}, {nickname:{$regex:nameS}}]}, {name:1, nickname:1, userid:1, branch:1, year:1}).sort({name:1}).exec(function(err,students){
		 if (err) {
 			  console.i(err);
 			  res.send("Falsexxx:"+err);
 		  }
   		  // object of all the users
		  res.send(students);
	});
 });

}