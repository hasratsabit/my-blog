const User = require('../model/user');
const Blog = require('../model/blog');
const Comment = require('../model/comment');
const Category = require('../model/category');
const upload = require('../model/upload');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (router) => {

    router.post('/postComment', (req, res) => {
        if(!req.body.blogId){
            res.json({ success: false, message: 'No blog id is provided.'});
        }else if(!req.body.comment){
            res.json({ success: false, message: 'The comment field is required.'});
        }else {
            Blog.findOne({ _id: req.body.blogId }, (err, blog) => {
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
                            let comment = new Comment({
                                authorName: user.name,
                                authorUsername: user.username,
                                comment: req.body.comment,
                                blogId: req.body.blogId,
                                blogTitle: blog.title
                            });
        
                            comment.save((err) => {
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


// ==========================================================
// 		 					GET ALL COMMENTS
// ==========================================================
    
    router.get('/allComments', (req, res) => {
        Comment.find({}, (err, comments) => {
            if(err){
                res.json({ success: false, message: 'Error occurred finding comments.' + err});
            }else if(!comments){
                res.json({ success: false, message: 'Comments are no longer available.'});
            }else {
                res.json({ success: true, comments: comments });
            }
        });
    });





    return router;
}
