/**
 * New node file
 */

var Post = require('../model/posts');
var url = require('url')
, Counter = require('../model/counters');
module.exports = function(app) {
	 
    app.get('/forumposts', function(req, res) {

    		Post.find({}).sort({created:-1}).exec(function(err,posts){
    		  if (err) throw err;
      		  // object of all the users
      		  res.send(posts);
    	});
});
    
    app.get('/forumposts/:postid', function(req, res) {
		
    	Post.findOne({ postid:req.params.postid },function(err,posts){
  		  if (err) {res.send("Falsexxx"); console.log(err);}
    		  // object of all the users
    		  res.send(posts);

  	});
    	
    });
    
    app.post('/createforumpost', function(req, res) {
    	
    	var params = req.body;
    	var titleStr=params.title;
    	var bodyStr=params.body;
    	var writeridStr=params.writerid;
    	var writerStr=params.writer;
    	var tagsStr=params.tags;
			var now=new Date();

    	var post = new Post({
    		title: titleStr,
    		  body: bodyStr,
    		  writerid: writeridStr,
    		  writer: writerStr,
    		  tags: tagsStr,
    	      reviewed: true,
    	      created: now
    	      
    	});
        Counter.findByIdAndUpdate(			//getting new postid
  				{ _id: "postid" },
  				{$inc:{sequence_value:1}},
  				function (err , data){
  					if(err) res.send("Falsexxx:"+err);
  					post.postid = data.sequence_value;
  					post.save(function (err) {			//save function
  	  		  	      if (err) 
  	  		  	        return res.send('Falsexxx:'+err);
  	  		  	      res.send('{response:"Successfully posted!", postid:'+data.sequence_value+'}');
  					});
  	  		  	     
  				});
        

    });
    
    app.post('/addcomment', function(req, res){

    	var params = req.body;
    	var postidS = params.postid;
    	var commentS = params.comment;
    	var useridS = params.userid;
    	var usernameS = params.username;
    	
        Counter.findByIdAndUpdate(			//getting new commentid
  				{ _id: "commentid" },
  				{$inc:{sequence_value:1}},
  				function (err , data){
  					if(err) {res.send("Falsexxx1");
  					console.log("Falsexxx1"+err);
  					}
  					commentidS = data.sequence_value;
  					Post.findOne({postid:postidS},
  							function(err, datas){
  	  					if(err) res.send("Falsexxx2");

  	  					console.log(datas);
  	  					var now=new Date();
  	  					datas.comments.push({commentid:commentidS, userid:useridS,
  	  					username:usernameS, 
  	  				  comment:commentS, created: now});

  	  		    datas.save(function (err) {
  	  		        if(err) {
  	  		            console.error('Falsexxx4!'+err);
  	  		        res.send('Falsexxx4!');
  	  		        return;
  	  		        }
	  		            console.log('Truexxx4!');
	  	  		        res.send('Truexxx4!');
  	  		    });
  					});
  					
  					
  				}); 
        
        
    });
    
    
app.get('/deletecomments/:postid/:commentid', function(req, res) {
		
    	Post.find({ postid:req.params.postid },function(err,posts){
  		  if (err) throw err;
    		  // object of all the users
    		 var post=posts[0];
    		 var comments=post.comments;
    		 
    		 for(var i = comments.length - 1; i >= 0; i--) {
    		      console.log(i+":"+comments[i].commentid);
    		      console.log("req:"+req.params.commentid);
    			    if(comments[i].commentid === req.params.commentid || comments[i].commentid == req.params.commentid) {
    			       post.comments.splice(i, 1);
    			       break;
    			       console.log('Found at:'+i);
    			    }
    			}
   		    post.save(function (err) {
	  		        if(err) {
	  		            console.error('Falsexxx5!'+err);
	  		        res.send('Falsexxx5!');
	  		        return;
	  		        }
  		            console.log('Truexxx5!');
  	  		        res.send('Truexxx5!');
	  		    });
			 
  	});
});
    
app.get('/forumposts/like', function(req, res){

	var params = req.body;
	var postidS = params.postid;
	var useridS = params.userid;
	var usernameS = params.username;
	var flag = params.flag;
		Post.findOne({postid:postidS},
							function(err, datas){
	  					if(err) res.send("Falsexxx2");

	  					console.log(datas);
	  					for(i=0;i<datas.likes.length;i++)
	  						if(datas.likes[i].userid==useridS)
	  							{
	  							if(flag==0){
	  								datas.likes.splice(i, 1);
	  								break;
	  							}
	  							console.log("Already liked!");
	  							res.send("Truexxx! Already Liked!");
	  							return;
	  							}
	  					if(flag!=0)		  					
	  					datas.likes.push({userid:useridS,
	  					username:usernameS});

	  		    datas.save(function (err) {
	  		        if(err) {
	  		            console.error('Falsexxx4!'+err);
	  		        res.send('Falsexxx4!');
	  		        return;
	  		        }
  		            console.log('Truexxx4!');
  	  		        res.send('Truexxx4!');
	  		    });
					});
					
					
				}); 


}