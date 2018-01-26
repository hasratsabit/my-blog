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
        // Check for the current blog id.
        if(!req.body.id){
            // Respond if no id is provided.
            res.json({ success: false, message: 'No blog id is provided.'});
            // Check for the comment field.
        }else if(!req.body.comment){
            // Repond if the comment is empty.
            res.json({ success: false, message: 'The comment field is required.'});
        }else {
            // Find the blog by it's id.
            Blog.findOne({ _id: req.body.id }, (err, blog) => {
                if(err){
                    // Respond for the error.
                    res.json({ success: false, message: 'Error occurred finding the blog.' + err});
                }else if(!blog){
                    // Respond if no blog is found.
                    res.json({ success: false, message: 'This blog is no longer available.'});
                }else {
                    // Find the user.
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if(err){
                            // Respond if error.
                            res.json({ success: false, message: 'Error occurred finding user.' +  err});
                            // Check if the user is logged in.
                        }else if(!user){
                            // Respond if the user is not logged in.
                            res.json({ success: false, message: 'You must be logged in to post comment.'});
                        }else {
                            // Push the comment to the comment array.
                            blog.comments.push({
                                authorName: user.name,
                                authorUsername: user.username,
                                comment: req.body.comment
                            });
                            
                            // Save the blog.
                            blog.save((err) => {
                                if(err){
                                    if(err.errors){
                                        // Check for the validation error.
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
            });
        }
    });
  

// ==========================================================
// 		 					LIKE COMMENT
// ==========================================================
    router.put('/likeComment', (req, res) => {
        // Check for the blog id.
        if(!req.body.blogId){
            // Respond if no blog is provided.
            res.json({ success: false, message: 'No blog id is provided.'});
        }else {
            // Find the blog by id.
            Blog.findOne({ _id: req.body.blogId }) 
            .select('comments') // Grab only the comments.
            .exec((err, comments) => {
                if(err){
                    // Respond if error.
                    res.json({ success: false, message: 'Error occurred finding comment.' + err });
                }else if(!comments){
                    // Respond if no comment is found.
                    res.json({ success: false, message: 'Comments are no longer available.'});
                }else {
                    // Find the user.
                    User.findOne({ _id: req.decoded.userId })
                    .select('username') // Grab the username only.
                    .exec((err, user) => {
                        if(err){
                            // Respond if error.
                            res.json({ success: false, message: 'Error occurred finding user.' + err });
                        }else if(!user){
                            // Respond if no user.
                            res.json({ success: false, message: 'You must be logged in to like this comment.'})
                        }else {
                            // Filter the comment by current comment id. Return the comment we are looking for.
                            let likeCom = comments.comments.filter(index => index._id == req.body.commentId);
                            // Check if the user already liked this comment.
                            if(likeCom[0].likedBy.includes(user.username)){
                                // Respond if the user already liked.
                                res.json({ success: false, message: 'You already likes this comment.'});
                                // Check if the user who wants like, also disliked.
                            }else if(likeCom[0].dislikedBy.includes(user.username)){
                                // Find the index of the user in disliked array.
                                const userIndex = likeCom[0].dislikedBy.indexOf(user.username);
                                // Delete the user from disliked array.
                                likeCom[0].dislikedBy.splice(userIndex, 1);
                                likeCom[0].dislikes--; // Decrement the dislikes. 

                                likeCom[0].likes++; // Increment the likes.
                                likeCom[0].likedBy.push(user.username); // Push the user to the liked array.
                                
                                // Save the like.
                                comments.save((err) => {
                                    if(err){
                                        // Respond if error.
                                        res.json({ success: false, message: 'Error occurred saving like.' + err});
                                    }else {
                                        res.json({ success: true, message: 'You liked this comment.'});
                                    }
                                });
                            }else {
                                // If the user never disliked, do the same operation to like the comment
                                likeCom[0].likes++;
                                likeCom[0].likedBy.push(user.username);
                                comments.save((err) => {
                                    if(err){
                                        res.json({ success: false, message: 'Error occurred.' + err});
                                    }else{
                                        res.json({ success: true, message: 'You liked this comment.'});
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });


// ==========================================================
// 		 					DISLIKE COMMENT
// ==========================================================
router.put('/dislikeComment', (req, res) => {
    // Check for the blog id.
    if(!req.body.blogId){
        // Respond if no blog is provided.
        res.json({ success: false, message: 'No blog id is provided.'});
    }else {
        // Find the blog by id.
        Blog.findOne({ _id: req.body.blogId }) 
        .select('comments') // Grab only the comments.
        .exec((err, comments) => {
            if(err){
                // Respond if error.
                res.json({ success: false, message: 'Error occurred finding comment.' + err });
            }else if(!comments){
                // Respond if no comment is found.
                res.json({ success: false, message: 'Comments are no longer available.'});
            }else {
                // Find the user.
                User.findOne({ _id: req.decoded.userId })
                .select('username') // Grab the username only.
                .exec((err, user) => {
                    if(err){
                        // Respond if error.
                        res.json({ success: false, message: 'Error occurred finding user.' + err });
                    }else if(!user){
                        // Respond if no user.
                        res.json({ success: false, message: 'You must be logged in to like this comment.'})
                    }else {
                        // Filter the comment by current comment id. Return the comment we are looking for.
                        let dislikeCom = comments.comments.filter(index => index._id == req.body.commentId);
                        // Check if the user already disliked this comment.
                        if(dislikeCom[0].dislikedBy.includes(user.username)){
                            // Respond if the user already disliked.
                            res.json({ success: false, message: 'You already disliked this comment.'});
                            // Check if the user who wants to dislike, also like.
                        }else if(dislikeCom[0].likedBy.includes(user.username)){
                            // Find the index of the user in liked array.
                            const userIndex = dislikeCom[0].likedBy.indexOf(user.username);
                            // Delete the user from liked array.
                            dislikeCom[0].likedBy.splice(userIndex, 1);
                            dislikeCom[0].likes--; // Decrement the likes. 

                            dislikeCom[0].dislikes++; // Increment the dislikes.
                            dislikeCom[0].dislikedBy.push(user.username); // Push the user to the disliked array.
                            
                            // Save the dislikes.
                            comments.save((err) => {
                                if(err){
                                    // Respond if error.
                                    res.json({ success: false, message: 'Error occurred saving like.' + err});
                                }else {
                                    res.json({ success: true, message: 'You liked this comment.'});
                                }
                            });
                        }else {
                            // If the user never liked, do the same operation to like the comment
                            dislikeCom[0].dislikes++;
                            dislikeCom[0].dislikedBy.push(user.username);
                            comments.save((err) => {
                                if(err){
                                    res.json({ success: false, message: 'Error occurred.' + err});
                                }else{
                                    res.json({ success: true, message: 'You liked this comment.'});
                                }
                            });
                        }
                    }
                });
            }
        });
    }
});


// ==========================================================
// 		 					EDIT COMMENT
// ==========================================================
    router.get('/getSingleComment/:blogId/:commentId', (req, res) => {
        // Check for the blog id.
        if(!req.params.blogId){
            // Respond if no blog id is provided.
            res.json({ success: false, message: 'No blog id was provided.'});
        }else {
            // Find the blog by it's id.
            Blog.findOne({ _id: req.params.blogId })
            .select('comments') // Select the comments only.
            .exec((err, comments) => {
                if(err){
                    res.json({ success: false, message: 'Error occurred finding the comments.' + err });
                }else if(!comments){
                    // Respond if no comment is found.
                    res.json({ success: false, message: 'No comments were found.'});
                }else {
                    // Find the user.
                    User.findOne({ _id: req.decoded.userId })
                    .select('username')
                    .exec((err, user) => {
                        if(err){
                            res.json({ success: false, message: 'Error occurred finding the user.' + err });
                        }else if(!user){
                            res.json({ success: false, message: 'You must be logged in to continue.'});
                        }else {
                            // Filter the comments and find the current comment by it's i.
                            let singleComment = comments.comments.filter(index => index._id == req.params.commentId);
                            // Send the comment.
                            res.json({ success: true, singleComment: singleComment});
                        }
                    });
                }
            });
        }
    });





// ==========================================================
// 		 					EDIT COMMENT
// ==========================================================

    router.put('/editComment', (req, res) => {
        // Check for blog id.
        if(!req.body.blogId){
            // Respond if no blog id is provided.
            res.json({ success: false, message: 'No blog id is provided.'});
        }else {
            // Find the current blog by it's id.
            Blog.findOne({ _id: req.body.blogId })
            .select('comments') // Select only the comments of the current post.
            .exec((err, comments) => {
                if(err){
                    res.json({ success: false, message: 'Error occurred ' + err });
                }else if(!comments){
                    res.json({ success: false, message: 'No comments found.'});
                }else {
                    // Find the user 
                    User.findOne({ _id: req.decoded.userId })
                    .select('username') // Select only the username.
                    .exec((err, user) => {
                        if(err){
                            res.json({ success: false, message: 'Error occurred.' + err});
                        }else if(!user){
                            // Respond if no user is found.
                            res.json({ success: false, message: 'You must be logged in the continue.'});
                        }else {
                            // Find the current comment from the comments of the post by it's id.
                            let updateComment = comments.comments.filter(index => index._id == req.body.commentId);
                              // Check if the author of the comment is the same as the user who edits this comment.
                            if(updateComment[0].authorUsername !== user.username){
                                res.json({ success: false, message: 'You are not authorized to edit this post.'})
                            }else {
                                // Assign the value of the comment to the value coming from user.
                                updateComment[0].comment = req.body.comment;
                                // Save the comments. 
                                comments.save((err) => {
                                    if(err){
                                        res.json({ success: false, message: 'Error occurred saving comment.' + err});
                                    }else {
                                        res.json({ success: true, message: 'Comment successfully updated.'});
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });

    return router;
}
