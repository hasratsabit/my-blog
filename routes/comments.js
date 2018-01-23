const User = require('../model/user');
const Blog = require('../model/blog');
const Category = require('../model/category');
const upload = require('../model/upload');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (router) => {


// ==========================================================
// 		 					POST COMMENT
// ==========================================================
    router.post('/postComment', (req, res) => {
        if(!req.body.id){
            res.json({ success: false, message: 'No blog id is provided.'});
        }else if(!req.body.comment){
            res.json({ success: false, message: 'The comment field is required.'});
        }else {
            Blog.findOne({ _id: req.body.id }, (err, blog) => {
                if(err){
                    res.json({ success: false, message: 'Error occurred finding the blog.' + err});
                }else if(!blog){
                    res.json({ success: false, message: 'This blog is no longer available.'});
                }else {
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if(err){
                            res.json({ success: false, message: 'Error occurred finding user.' +  err});
                        }else if(!user){
                            res.json({ success: false, message: 'You must be logged in to post comment.'});
                        }else {
                            blog.comments.push({
                                authorName: user.name,
                                authorUsername: user.username,
                                comment: req.body.comment
                            });
        
                            blog.save((err) => {
                                if(err){
                                    if(err.errors){
                                        if(err.errors.comment){
                                            res.json({ success: false, message: err.errors.message });
                                        }else {
                                            res.json({ success: false, message: 'Error occurred saving comment.' + err });
                                        }
                                    }else {
                                        res.json({ success: false, message: 'Error occurred saving comment.' + err });
                                    }
                                }else {
                                    res.json({ success: true, message: 'Your comment successfully saved.'});
                                } 
                            });
                        }
                    });
                }
            })
        }
    });
  





    return router;
}
