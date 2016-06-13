var express = require('express');
var router = express.Router();

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
