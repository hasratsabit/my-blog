const User = require('../model/user');
const Profile = require('../model/profile');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const config = require('../config/database');

module.exports = (router) => {


// ==========================================================
// 		 									GET USER
// ==========================================================
	router.get('/getUsers', (req, res) => {
		// Search for all user in the database using the User object.
		User.find({}, (err, users) => {
			// Check if there is any error.
			if(err){
				// Respond if there is any error.
				res.json({ success: false, message: 'Error occured finding users.'});
				// Check if the user doesn't exist.
			}else if(!users){
				// Respond if the user doesn't e
				res.json({ success: false, message: 'There are no users found.'});
			}else {
				// Send the user object.
				res.json({ success: true, user: users });
			}
		}).sort({ '_id': -1 }); // Sort by the most up to date.
	});

// ==========================================================
// 		 									GET SINGLE USER
// ==========================================================

	router.get('/getSingleUser/:id', (req, res) => {
		// Check if the id is provided for the user.
		if(!req.params.id){
			// Respond if the id is not provided.
			res.json({ success: false, message: 'No user id was provided.'});
		}else {
			// Find the user by it's unique id.
			User.findOne({ _id: req.params.id}, (err, user) => {
				// Check if there is any error.
				if(err){
					// Respond if there is any error.
					res.json({ success: false, message: 'Error occured finding the user.', err });
					// Check if the user exist in database.
				}else if(!user) {
					// Respond if the user doesn't exist in database.
					res.json({ success: false, message: 'No user was found.'});
				}else {
					// Respond with the user object.
					res.json({ success: true, user: user });
				}
			})
		}
	})

// ==========================================================
// 		 									UPDATE USER
// ==========================================================

	router.put('/updateUser', (req, res) => {
		// Find the blog by it's id from the body that user want to update.
		if(!req.body._id){
			res.json({ success: false, message: 'No user id was provided.'});
		}else {
			User.findOne({ _id: req.body._id }, (err, user) => {
				if(err){
					res.json({ success: false, message: 'Error occured finding the blog.', err });
				}else if(!user){
					res.json({ success: false, message: 'No user was found.'});
				}else {
					User.findOne({ _id: req.decoded.userId }, (err, authUser) => {
						if(err){
							res.json({ success: false, message: 'Error occured finding user.', err });
						}else if (!authUser) {
							res.json({ success: false, message: 'No user was found with admin role.'});
						}else if (authUser.adminAccess === false) {
							res.json({ success: false, message: 'You are not authorized to edit this user.'});
						}else {
							user.name = req.body.name;
							user.email = req.body.email;
							user.username = req.body.username;
							user.adminAccess = req.body.adminAccess;
							user.password = req.body.password;
							user.save((err) => {
								if(err){
									if(err.errors.name){
										res.json({ success: false, message: err.errors.name.message });
									}else if (err.errors.username) {
										res.json({ success: false, message: err.errors.username.message });
									}else if (err.errors.email) {
										res.json({ success: false, message: err.errors.email.message });
									}else if (err.errors.password) {
										res.json({ success: false, message: err.errors.password.message });
									}else {
										res.json({ success: false, message: 'Error occured:' + err });
									}
								}else {
									res.json({ success: true, message: 'User successfully updated.'});
								}
							})
						}
					})
				}
			})
		}
	});

// ==========================================================
// 		 									DELETE USER
// ==========================================================

	router.delete('/deleteUser/:id', (req, res) => {
		User.findOne({ _id: req.params.id})
		.then((user) => {
			if(!user){
				res.json({ success: false, message: 'User was not found. '});
			}else {
				User.findOne({ _id: req.decoded.userId })
				.select('username adminAccess')
				.then((authUser) => {
					if(!authUser) {
						res.json({ success: false, message: 'You must be logged in to continue.'});
					}else if(authUser.adminAccess === false){
						res.json({ success: false, message: 'You are not authorized to delete the user.'});
					}else {
						Profile.findOne({ username: user.username })
						.then(profile => {
							if(!profile){
								removeUser(user);
							}else {
								removeImage(profile.image);
								removeProfile(profile);
								removeUser(user);
							}
						})
					}
				})
			}
		})
		.catch(err => {
			res.json({ success: false, message: 'Error occurred. ' + err });
		})
		
		const removeImage = (image) => {
			if(!image){
				return null;
			}else {
				fs.unlink(image, (err) => {
					if(err){
						res.json({ success: false, message: 'Error occurred deleting image.' + err})
					}
				})
			}
		}
	
		const removeUser = (user) => {
			user.remove(err => {
				if(err){
					res.json({ success: false, message: 'Error occurred deleting user.' + err})
				}else {
					res.json({ success: true, message: 'User successfully deleted.'})
				}
			})
		}
	
		const removeProfile = (profile) => {
			profile.remove(err => {
				if(err){
					res.json({ success: false, message: 'Error occurred deleting profile.' + err})
				}
			})
		}
		
	});



										
// ==========================================================
// 		 									DELETE USER
// ==========================================================
	router.get('/getUserProfile', (req, res) => {
		User.findOne({ _id: req.decoded.userId }, (err, user) => {
			if(err){
				res.json({ success: false, message: 'Error occured finding user.' + err});
			}else if (!user) {
				res.json({ success: false, message: 'The user was not found in database.'});
			}else {
				res.json({ success: true, user: user });
			}
		})
	})

	return router;
}
