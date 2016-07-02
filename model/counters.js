/**
 * New node file
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema

var counterSchema = new Schema({
  _id: {type: String},
	sequence_value: { type: Number}
});

//the schema is useless so far
//we need to create a model using it
var Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;