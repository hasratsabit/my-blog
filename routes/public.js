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
	})
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
		  })
	  }
  })


	return router;
}
