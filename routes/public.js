const User = require('../model/user');
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



	// router.delete('/deleteReply/:blogId/:commentId/:replyId', (req, res) => {
	// 	Blog.findOne({ _id: req.params.blogId })
	// 	.select('comments')
	// 	.exec((err, comments) => {
	// 		let parentComments = comments.comments.filter(index => index._id == req.params.commentId);
	// 		let childComment = parentComments[0].replies.filter(index => index._id == req.params.replyId)
	// 		res.json(childComment[0].authorUsername);
	// 	})
	// })

	return router;



}
