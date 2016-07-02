/**
 * New node file
 */
var Student = require('../model/students'),
Alumni = require('../model/alumni');

var i=0;
module.exports = function(app) {
	 
    app.get('/review', function(req, res) {

    	var i=0;
    	res.write("{ ");
Student.find({ reviewed:false }, {name:true, userid:true, branch:true, year:true},function(err, student) {
	  if (err) throw err;
	  res.write("\nstudents: [");
	  res.write(student.toString());
	  res.write(" ]");
	    	res.write(" }");
	  res.end();
});
});


    app.get('/review/allow/:userid', function(req, res) {
    
    	var Person=Student;
    	
    Person.update({ userid: req.params.userid}, {$set:{reviewed:true}},function(err, alumni) {
  	  if (err) throw err;
  	  
  	 res.send("Truexxx! Updated!");
    });
    });

    app.get('/review/disallow/:userid', function(req, res) {
        
    	var Person=Student;
    	
    Person.update({ userid: req.params.userid}, {$set:{reviewed:false}},function(err, alumni) {
  	  if (err) throw err;
  	  
  	 res.send("Truexxx! Updated!");
    });
    });

}
