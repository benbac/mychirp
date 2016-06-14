var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
	
	if(req.method === "GET"){
		//continue to the next middleware or request handler
		return next();
	}
	
	if(!req.isAuthenticated()){
		//user not authenticated, redirect to login page
		return res.redirect('/#login');
	}
	
	return next();
});

router.route('/posts')
	//return all posts
	.get(function(req, res){
		//temp solutions
		res.send({message: 'TODO return all posts'})
	})
	.post(function(req, res){
		//temp solutions
		res.send({message: 'TODO create new post'})
	});

router.route('/posts/:id')
	//returns a particular post
	.get(function(req, res){
		res.send({message: 'TODO return post with ID '+req.params.id});
	})
	//updates an existing post
	.put(function(req, res){
		res.send({message: 'TODO modify post with ID '+req.params.id});
	})
	//deletes an existing post
	.delete(function(req, res){
		res.send({message: 'TODO delete post with ID '+req.params.id});
	})

module.exports = router;


/**
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);
**/