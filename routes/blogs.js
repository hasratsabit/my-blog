const User = require('../model/user');
const Blog = require('../model/blog');
const Category = require('../model/category');
const upload = require('../model/upload');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('../config/database');


module.exports = (router) => {
  

// ==========================================================
// 		 									POST BLOG
// ==========================================================

    router.post('/postBlog', upload.single('blogImage'), (req, res) => {
        // Check if the title is provided.
        if(!req.body.title){
          // Respond if the title is not provided.
          res.json({ success: false, message: 'The title field is required.'});
          // Check if the body is provided.
        }else if(!req.body.body){
          // Respond if the body is not provided.
          res.json({ success: false, messae: 'The body field is required.'});
          // Check if the author is provided.
        }else if(!req.body.author) {
          // Respond if the author is not provided.
          res.json({ success: false, message: 'The author is required.'});
        }else {
          // Find the user who is posting this blog.
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            // Check for error finding the user. 
            if(err){
              // Respond if there is any error while finding the user. 
              res.json({ success: false, message: 'Error occured finding the user.' + err });
              // Check if the user exist in the database. 
            }else if(!user) {
              // Respond if the user doesn't exist in database.
              res.json({ success: false, message: 'The author is not a register user. '});
              // Check if the user has admin access.
            }else if(user.userRole !== 'admin' ) {
              // Respond if the user doesn't have admin access.
              res.json({ success: false, message: 'The user is not authorized to post blog.'});
            }else {
              // Create the blog schema based on the modal.
              let blog = new Blog({
                title: req.body.title,
                body: req.body.body,
                author: req.body.author,
                authorUsername: req.body.authorUsername,
                category: req.body.category,
                imagePath: req.file.path // Image path is provided by upload middleware.
              })

              // Save blog
              blog.save((err) => {
                // Check for error while saving.
                if(err){
                  // Check for db validation error.
                  if(err.errors){
                    // Check for title validation error.
                    if(err.errors.title){
                      // Respond if the title is not valid.
                      res.json({ success: false, message: err.errors.title.message });
                      // Check for body validation error.
                    }else if(err.errors.body){
                      // Respond if the body is not valid.
                      res.json({ success: false, message: err.errors.body.message });
                    }else {
                      // Repond if there is any other error aside from validation.
                      res.json({ success: false, message: 'Error occcured saving the blog.' + err});
                    }
                  }else {
                    // Repond if it a database error.
                    res.json({ success: false, message: 'Database error occured.' + err});
                  }
                }else {
                  // Respond with success if all the tests are passed.
                  res.json({ success: true, message: 'Blog successfully posted.'});
                }
              })
            }
          })
        }
    });

// ==========================================================
// 		 									DELETE BLOG
// ==========================================================

    router.delete('/deleteBlog/:id', upload.single('blogImage'), (req, res) => {
      // Check for deleting blog id
      if(!req.params.id){
        // Respond if the blog id is not provided.
        res.json({ success: false, message: 'No id was provided.'});
      }else {
        // Find the deleting blog by it's id.
        Blog.findOne({ _id: req.params.id }, (err, blog) => {
          if(err){
            // Respond if there is any error.
            res.json({ success: false, message: 'Error occured finding the blog.' + err });
            // Check if the blog exist in database.
          }else if(!blog){
            // Respond if the blog doesn't exsit in database.
            res.json({ success: false, message: 'The blog is no longer available.'});
          }else {
            // Find the user to validate the authorization 
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if(err){
                // Repond if there is any error.
                res.json({ success: false, message: 'Error occurred finding user.' + err})
                // Check if the user doesn't exist in database.
              }else if(!user){
                // Respond if the user doesn't exist.
                res.json({ success: false, message: 'You must be logged in to continue.'});
                // Check the user is either the author of the blog or an authorized admin.
              }else if(user.userRole !== 'admin' || blog.authorUsername !== user.username){
                // Respond if the user is not authorized.
                res.json({ success: false, messae: 'You are not authorized to delete this blog.'});
              }else {
                // Removes the image from the folder using the imagePath from deleting blog object.
                if(blog.imagePath){
                  fs.unlink(blog.imagePath, (err) => { 
                    if(err) throw err;
                  });
                }else {
                  return null;
                }
                // Remove the blog from database.
                blog.remove((err) => {
                  // Check for error.
                  if(err){
                    // Respond if there is any error.
                    res.json({ success: false, message: 'Error occurred deleting blog.' + err});
                  }else {
                    // Respond the success message.
                    res.json({ success: true, message: 'Blog successfully deleted.'})
                  }
                });
              }
            });
          }
        });
      }
    });


// ==========================================================
// 		 									UPDATE BLOG
// ==========================================================

    router.put('/updateBlog', upload.single('blogImage'), (req, res) => {
      // Check if the blog id is provided.
      if(!req.body._id){
        // Respond if the blog id is not provided.
        res.json({ success: false, message: 'No blog id was provided.'});
      }else {
        // Find the blog by it's id.
        Blog.findOne({ _id: req.body._id }, (err, blog) => {
          if(err){
            // Respond if there is any error.
            res.json({ success: false, message: 'Error occurred finding the blog.' + err });
            // Check if the blog is not available.
          }else if(!blog){
            // Respond if the blog is not available.
            res.json({ success: false, message: 'Blog is not found.'});
          }else {
            // Find the user.
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if(err){
                // Respond if there is any error
                res.json({ success: false, message: 'Error occurred finding the user.' + err});
              }else if(!user){
                // Respond if the user is not logged in.
                res.json({ success: false, message: 'You must be logged in to edit this blog.'});
                // Check if the user is author or authorized admin
              }else if(user.userRole !== 'admin' || user.username !== blog.authorUsername) {
                // Respond if the user is not admin or author.
                res.json({ success: false, message: 'You must be the author or an authorized admin to edit this blog.'});
              }else {
                // Removes the image from the folder using the imagePath from deleting blog object.
                // If a file exist.
                  fs.unlink(blog.imagePath, (err) => { 
                    if(err) throw err;
                  });
                
                // Update the blog.
                blog.title = req.body.title;
                blog.body = req.body.body;
                blog.category = req.body.category;
                blog.author = req.body.author;
                blog.authorUsername = req.body.authorUsername;
                blog.imagePath = req.file.path;
                
                
                // Save blog
                blog.save((err) => {
                  // Check for error while saving.
                  if(err){
                    // Check for db validation error.
                    if(err.errors){
                      // Check for title validation error.
                      if(err.errors.title){
                        // Respond if the title is not valid.
                        res.json({ success: false, message: err.errors.title.message });
                        // Check for body validation error.
                      }else if(err.errors.body){
                        // Respond if the body is not valid.
                        res.json({ success: false, message: err.errors.body.message });
                      }else {
                        // Repond if there is any other error aside from validation.
                        res.json({ success: false, message: 'Error occcured saving the blog.' + err});
                      }
                    }else {
                      // Repond if it a database error.
                      res.json({ success: false, message: 'Database error occured.' + err});
                    }
                  }else {
                    // Respond with success if all the tests are passed.
                    res.json({ success: true, message: 'Blog successfully updated.'});
                  }
                });
              }
            });
          }
        });
      }
    });



// ==========================================================
// 		 									LIKE BLOG
// ==========================================================
    router.put('/likeBlog', (req, res) => {
      // Check if the blog id is provided.
      if(!req.body.id){
        // Respond if the blog id is not provided.
        res.json({ success: false, message: 'No user id was provided.'});
      }else {
        // Find the blog.
        Blog.findOne({ _id: req.body.id }, (err, blog) => {
          if(err){
            // Respond if any error.
            res.json({ success: false, message: 'Error occurred finding the blog.' + err});
          }else if(!blog){
            // Respond if the blog is not found.
            res.json({ success: false, message: 'Blog is no longer available.'});
          }else {
            // Find the user.
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if(err){
                // Respond if there is any error.
                res.json({ success: false, message: 'Error occurred finding user.' + err });
                // Check if the user is logged in.
              }else if(!user){
                // Respond if the user is not logged in.
                res.json({ success: false, message: 'You must be logged in to like this blog.'});
                // Check if the person who likes is the author of the same blog.
              }else if(user.username === blog.authorUsername){
                // Respond if the author is trying to like his blog.
                res.json({ success: false, message: ' You can not like your own post.'});
                // Check if the user already liked this blog.
              }else if(blog.likedBy.includes(user.username)){
                // Respond if the user already liked this blog.
                res.json({ success: false, message: 'You already liked this post.'})
              }else {
                blog.likes++ // Increment the like by one.
                blog.likedBy.push(user.username); // Push the username of the person to likedBy array.
                // Save the blog.
                blog.save((err) => {
                  if(err){
                    // Respond if there is any error.
                    res.json({ success: false, message: 'Error occurred saving like.' + err});
                  }else {
                    // Repond with success.
                    res.json({ success: true, message: 'You liked blog successfully.'});
                  }
                })
              }
            })
          }
        })
      }
    })




// ==========================================================
// 		 									CHANGE BLOG STATUS
// ==========================================================
    router.put('/changeStatus', (req, res) => {
      if(!req.body.id){
        // Respond if no blog id is provided.
        res.json({ success: false, message: 'No blog Id was provided.'});
      }else {
        // Find the blog by it's id.
        Blog.findOne({ _id: req.body.id }, (err, blog) => {
          if(err){
            // Respond if there is any error.
            res.json({ success: false, message: 'Error occured finding the blog.' + err });
          }else if(!blog){
            // Respond if the blog is not available.
            res.json({ success: false, message: 'No blog was found.'});
          }else {
            // Find the user.
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if(err){
                // Respond if there is any error.
                res.json({ success: false, message: 'Error occured finding the user.' + err });
              }else if(!user){
                // Respond if the user is not logged in.
                res.json({ success: false, message: 'You must be logged in to change the status.'});
                // Check if the user is either admin or the author of the blog to change the status.
              }else if(user.userRole !== 'admin' || user.username !== blog.authorUsername ){
                // Respond if the user is not authorized to change the status of the blog.
                res.json({ success: false, message: 'You are not authorized to change the status.'});
              }else {
                // Check if the blog status draft.
                if(blog.blogStatus === 'draft'){
                  blog.blogStatus = 'published'; // Change it to publish if the status is draft
                }else {
                  blog.blogStatus = 'draft' // Change it to draft if the status is published.
                }
                
                // Save the blog.
                blog.save((err) => {
                  // Check for error.
                  if(err){
                    // Respond if there is any error.
                    res.json({ success: false, message: 'Error occurred saving the blog.' + err });
                  }else {
                    // Respond with success message.
                    res.json({ success: true, message: 'Blog successfully saved.'});
                  }
                });
              }
            })
          }
        });
      }
    });







    return router;
}