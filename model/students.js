/**
 * New node file
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_FACTOR = 10;
// create a schema

var studentSchema = new Schema({
	userid: {type: Number, required: true, unique: true},
	name: {type: String, required: true},
	nickname: {type: String, Default: ""},
	branch : {type: String, required: true},
	program : {type: String, required: true},
	dob: {type: Date, required: true},
	gender: {type: Boolean, Default: true}, //true for male, false for female
	email : {type: String, required: true},
	phone : {type: String, Default: ""},
	city : {type: String, Default: ""},
	school : {type: String, Default: ""},
	address : {type: String, Default: ""},
	rollno : {type: String, Default: 0},
	year : {type : Number, required: true}, //passing year
	organisation : {type: String, Default: ""},
	designation : {type: String, Default: ""},
	status : {type: String, Default: ""},
	aboutme :  {type: String, Default: ""},
	relationship: {
		id:{type: Number, Default: 1},
		userid:{type: Number, Default:1}
		},
	siblings:	[{type: String}],
	privacy : {type: Boolean, Default: true},
	interests: [{
		skill:{type: String},
		perc:{type: Number, min:0, max:100, Default:0}
		}],
	weblinks: [{
		website:{type: String},
		link:{type: String}
	}],
	reviewed : {type: Boolean, Default: false},
	
	
});


//on every save, add the date
studentSchema.pre('save', function(next) {
//check if it exist
	var self = this;

next();
});


//the schema is useless so far
//we need to create a model using it
var Student = mongoose.model('Student', studentSchema);



// make this available to our users in our Node applications
module.exports = Student;