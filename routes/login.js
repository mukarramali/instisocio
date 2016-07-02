var url = require('url'),
 bcrypt = require('bcryptjs'),
 User = require('../model/users'),
 Student = require('../model/students'),
 merge = require('merge'),
 extend = require('extend'),
 SALT_FACTOR = 10;

module.exports = function(app) {
 	
    app.get('/login', function(req, res) {
   var params = url.parse(req.url,true).query;
   var email, password;
   emailStr=params.email;
	passwordStr=params.password;
  if(emailStr==null){
	  res.send('Falsexxx! 1 Not found');
		return;
  }
	console.log('email:'+emailStr);
	User.findOne({$or:[{ email: emailStr }, { username: emailStr }]}, function(err, user) {
		  if (err||user==null) {
			  res.send('Falsexxx:'+err);
			  return;
//			  throw err;
			  }
		 // res.send(user);
		  var password=user.password;
		  bcrypt.compare(passwordStr, password, function(error,bool) {
		  	
			  if(bool) {
	//		console.log(user);
				  Student.findOne({ userid: user.userid }, function(err, data) {
					  if (err) {
						  res.send('Falsexxx:'+err);
						return;  
					  }
					 data2=data.toObject();
					 data2.role=user.role;
					 res.send(data2);
					 console.log(data2);
					  }
			  );
}
		  	else res.send('Falsexxx! 3 Not found');
		  });
	   });
    });
}