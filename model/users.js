/**
 * New node file
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_FACTOR = 10,
Counter = require('./counters');
// create a schema

var userSchema = new Schema({
  userid: {type: Number, unique: true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, Default: 2},
  reviewed : {type: Boolean, Default: false},
	 
});

userSchema.pre('save', function(next) {
	  //check if it exist
		var self = this;
		User.find({username : self.username}, function (err, docs) {
		      if (docs.length){
		          console.log('user exists: ',docs.username);
		          return (new Error("User exists!"));
		      }
				
		});
	next();	
	});


//the schema is useless so far
//we need to create a model using it
var User = mongoose.model('User', userSchema);

//on every save, add the date

// make this available to our users in our Node applications
module.exports = User;