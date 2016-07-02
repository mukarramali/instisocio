/**
 * New node file
 */

var url = require('url')
	, bcrypt = require('bcryptjs')
	, User = require('../model/users')
	, Counter = require('../model/counters')
	, Student = require('../model/students')
	, SALT_FACTOR = 10;

module.exports = function(app) {
	
	app.get('/add/:username/:email', function(req, res) {
		res.write("{ ");

		var i=0;
		User.find({ username:req.params.username },function(err,users){
			  if (err) throw err;
			  var str=0;
			  str=users.toString();
			  console.log("username:"+req.params.username);
			  if(str.length<=1)
			  {res.write("username:true");
			  	console.log("username:true");
					  }
			  else
			  {  res.write("username:false");
			  	console.log("username:false");
			  }
			  i++;
			  if(i==2){
			    	res.write(" }");
			  res.end();}
			  else
				  res.write(" , ");
		});

		User.find({ email:req.params.email },function(err,users){
			  if (err) throw err;
			  var str=0;
			  str=users.toString();
			  console.log("email:"+req.params.email);
			  if(str.length<=1)
			  {		  res.write("email:true");
			  	console.log("email:true");
				}else{
				  res.write("email:false");
				  	console.log("email:false");
					}
			  i++;
			  if(i==2){
			    	res.write(" }");
			  res.end();}
			  else
				  res.write(" , ");
		});
		
	});
		

	
	
app.post('/add', function(req,res){
	// call the built-in save method to add to the database

	var params=req.body;
	var usernameStr=params.username;
	var emailStr=params.email;
	var passwordStr=params.password;
	
	//1 for student, 2 for alumni
	var ali = new User({
		email: emailStr,
		  username: usernameStr,
		  password: passwordStr,
		  reviewed: false,
		  role: 2
		});

	console.log('saving');
	  // generate a salt
	  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
	      if (err) return next(err);
	      // hash the password along with our new salt
	      bcrypt.hash(ali.password, salt, function(err, hash) {
	    	  if (err) return console.log(err);
	          ali.password = hash;
	 //____________________    
	          Counter.findByIdAndUpdate(			//getting new userid
	  				{ _id: "userid" },
	  				{$inc:{sequence_value:1}},
	  				function (err , data){
	  					if(err) res.send(err);
	  				ali.userid = data.sequence_value;
	  		      ali.save(function (err) {			//save function
	  		  	      if (err) 
	  		  	        return res.send('Error'+err);
	  		  	      
	  		  	      signupStudent(params, ali.userid, res);
	  		  	      console.log('Saved successfully!');	
	  		  	});
	  		  }
	  		);	
	  		//____________________
	     });
	  });	  		
});

function signupStudent(params, useridStr, res){
	var Person = new Student({
			userid: useridStr,			//
			name: params.name,			//
			program: params.program,	//
			branch: params.branch,	    //
			nickname: params.nickname,  //
			dob: params.dob,
			gender: params.gender, 		//true for male, false for female
			email : params.email,		//
			phone : params.phone,	
			city : params.city,	
			school : params.school,
			rollno : params.rollno,	
			year : params.year,			 //passing year
			organisation: params.organisation,
			designation: params.designation,
			relationship: {id:1, userid:1},
			interests: [{skill:params.interests, perc:100}],
			weblinks: [{website:"Web1", link:params.webu}],
			status: params.status,
			aboutme: params.aboutme,
			privacy : false,
			reviewed : false
		});
	
	console.log('in signup');
    Person.save(function (err) {			//save function
	  	      if (err) 
	  	        return res.send('Error:'+err);
	  	      res.send('Truexxx! Saved Students successfully!');
	  	      console.log('Saved Students successfully!');	
	  	});
	}
}


