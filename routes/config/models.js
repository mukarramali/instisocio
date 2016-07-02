var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var userSchema = mongoose.Schema({
    name : String,
    mobno: String,
    reg_id: String
});
 
//the schema is useless so far
//we need to create a model using it
var User = mongoose.model('gcmusers', userSchema);

module.exports = User;