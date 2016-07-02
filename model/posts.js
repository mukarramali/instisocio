/**
 * New node file
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_FACTOR = 10,
Counter = require('./counters');

var postSchema = new Schema({
	  postid: {type: Number, unique: true},
	  title: { type: String, required: true},
	  body: { type: String, required: true},
	  writer: { type: String, required: true },
	  writerid: {type: Number, required: true},
	  tags: [String],
	  comments: [{commentid:{type:Number}, userid:{type:Number}, username:{type:String}, 
		  comment:{type:String}, created: {type: Date, required:true}}],
	  likes: [{userid:{type:Number}, username:{type:String}}],
	  reviewed: {type: Boolean, Default: true},
	  created: {type: Date, required:true}
	  
	});

//the schema is useless so far
//we need to create a model using it
var Post = mongoose.model('Post', postSchema);



//make this available to our users in our Node applications
module.exports = Post;