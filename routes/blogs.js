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
                fs.unlink(blog.imagePath, (err) => { 
                  if(err) throw err;
                });
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
                })
              }
            })
          }
        })
      }
    })




    return router;
}