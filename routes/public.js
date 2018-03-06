const User = require('../model/user');
const Profile = require('../model/profile');
const Blog = require('../model/blog');
const jwt = require('jsonwebtoken');

const config = require('../config/database');


module.exports = (router) => {

// ==========================================================
// 		 				GET BLOGS
// ==========================================================

router.get('/allBlogs', (req, res) => {
	Blog.find({}, (err, blogs) => {
	  if(err){
		res.json({ success: false, message: 'Error occured finding blogs.' + err});
	  }else if(!blogs){
		res.json({ success: false, message: 'No blogs posted yet.'});
	  }else {
		res.json({ success: true, blogs: blogs });
	  }
	}).sort({'_id': -1 });
  });


// ==========================================================
// 		 				GET SINGLE BLOG
// ==========================================================

  router.get('/singleBlog/:id', (req, res) => {
	  if(!req.params.id){
		  res.json({ success: false, message: 'No id was provided for the blog.'});
	  }else {
		  Blog.findOne({ _id: req.params.id }, (err, blog) => {
			  if(err){
				  res.json({ success: false, message: 'Error occured loading blog.'});
			  }else if(!blog){
				  res.json({ success: false, message: 'Blog is no longer available'});
			  }else {
				  res.json({ success: true, blog: blog });
			  }
		  });
	  }
	});
	

// ==========================================================
// 		 				INCREMENT BLOG VIEW
// ==========================================================

	router.put('/updateView/:id', (req, res) => {
		if(!req.params.id) {
			res.json({ success: false, message: 'No blog Id was provided.'});
		}else {
			Blog.findOne({ _id: req.params.id }, (err, blog) => {
				if(err){
					res.json({ success: false, message: 'Error occurrred finding the blog.' + err });
				}else if(!blog) {
					res.json({ success: false, message: 'The blog is no longer available.'});
				}else{
					blog.viewCounter++;
					blog.save((err) => {
						if(err){
							res.json({ success: false, message: 'Error occurred saving view.' + err });
						}else {
							res.json({ success: true, message: 'View saved.'});
						}
					});
				}
			});
		}
	});


	router.get('/userProfile/:username', (req, res) => {
		if(!req.params.username){
			res.json({ success: false, message: 'No username was provided.'});
		}else {
			Profile.findOne({ username: req.params.username }, (err, user) => {
				if(err){
					res.json({ success: false, message: 'Error occurred finding the user.' + err });
				}else if(!user){
					res.json({ success: false, message: 'No user was found. '});
				}else {
					res.json({ success: true, user: user });
				}
			});
		}
	});


// ==========================================================
// 		 									SHARE COUNTER
// ==========================================================

	router.put('/updateBlogShare/:id', (req, res) => {
		Blog.findOne({ _id: req.params.id })
		.select('shareCounter')
		.then((blog) => {
			if(!blog){
				res.json({ success: false, message: 'Blog is no longer available.'});
			}else {
				blog.shareCounter++;
				blog.save((err) => {
					if(err){
						res.json({ success: false, message: 'Error occurred saving the share counter.' + err });
					}
					// If no err, share counter is incremented.
				})
			}
		})
		.catch((err) => {
			res.json({ success: false, message: 'Error occurred. ' + err });
		})
	})

	return router;



}
