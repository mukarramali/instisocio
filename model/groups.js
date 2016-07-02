/**
 * New node file
 */
var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var groupSchema = mongoose.Schema({
    name : String,
    groupid : Number,	//
    members : [String],	//userid
    //types:1.batch, 2.branch, 3.class
    type : Number,
    
});
 
//the schema is useless so far
//we need to create a model using it
var Group = mongoose.model('groups', groupSchema);

module.exports = Group;