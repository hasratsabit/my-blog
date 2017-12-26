const User = require('../model/user');
const jwt = require('jsonwebtoken');

const config = require('../config/database');


module.exports = (router) => {

// ==========================================================
// 		 									REGISTER USER
// ==========================================================

	router.post('/registerUser', (req, res) => {
		// Check if the name field is empty.
		if(!req.body.name){
			res.json({ success: false, message: 'The name field is required.'});
		// Check if the username field is empty.
		}else if(!req.body.username){
			res.json({ success: false, message: 'The username field is required.'});
		// Check if the email field is empty.
		}else if(!req.body.email){
			res.json({ success: false, message: 'The email field is required.'});
		// Check if the password field is empty.
		}else if (!req.body.password) {
			res.json({ success: false, message: 'The password field is required.'});
		}else {

			// Store the input values given by user in the user object.
			let user = new User({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			});

			// Save object.
			user.save((err) => {
				// Check for error.
				if(err){
					// Check if it is a username or email duplicate error.
					if(err.code === 11000){
						res.json({ success: false, message: 'E-mail or Username already exist.'});
					}else {
						// Check if it is a validation error.
						if(err.errors){
							// Check if it is name validation error.
							if(err.errors.name){
								res.json({ success: false, message: err.errors.name.message });
							// Check if it is username validation error.
							}else if (err.errors.username) {
								res.json({ success: false, message: err.errors.username.message });
							// Check if it is email validation error.
							}else if (err.errors.email) {
								res.json({ success: false, message: err.errors.email.message });
							// Check if it is password validation error.
							}else if (err.errors.password) {
								res.json({ success: false, message: err.errors.password.message });
							}else {
								// Respond if it is any othe validation error.
								res.json({ success: false, message:  err });
							}
						}else {
							// Respond if it is any error other than validation.
							res.json({ success: false, message: 'Could not save user. Error: ', err });
						}
					}
				}else {
					// Respond with success message once the validaiton test is passed.
					res.json({ success: true, message: 'Account successfully created.'})
				}
			})
		}
	})



// ==========================================================
// 		 					CHECK IF THE EMAIL IS AVAILABLE
// ==========================================================

	router.get('/checkEmail/:email', (req, res) => {
		// Check if the email param exist.
		if(!req.params.email){
			// Respond if no param is provided.
			res.json({ success: false, message: 'No email was provided.'});
		}else {
			// Find the email in the database.
			User.findOne({ email: req.params.email}, (err, email) => {
				// Check if error when searching for email
				if(err){
					// Respond if error
					res.json({ success: false, message: 'Error occured finding email.', err });
					// Check if email already exist in database.
				}else if (email) {
					// Respond if the email is alredy exist in database
					res.json({ success: false, message: 'The email address is already taken.'});
				}else {
					// Respond if email is not taken.
					res.json({ success: true, message: 'Email is available.'})
				}
			})
		}
	})

// ==========================================================
// 		 					CHECK IF THE USERNAME IS AVAILABLE
// ==========================================================

	router.get('/checkUsername/:username', (req, res) => {
		// Check if the username param exist.
		if(!req.params.username){
			// Respond if no param is provided.
			res.json({ success: false, message: 'No username was provided.'});
		}else {
			// Find the username in the database.
			User.findOne({ username: req.params.username}, (err, username) => {
				// Check if error when searching for username
				if(err){
					// Respond if error
					res.json({ success: false, message: 'Error occured finding username.', err });
					// Check if username already exist in database.
				}else if (username) {
					// Respond if the username is alredy exist in database
					res.json({ success: false, message: 'The username address is already taken.'});
				}else {
					// Respond if username is not taken.
					res.json({ success: true, message: 'Username is available.'})
				}
			})
		}
	})

// ==========================================================
// 		 					LOGIN
// ==========================================================

	router.post('/login', (req, res) => {
		if(!req.body.username){
			res.json({ success: false, message: 'Please provide a username.'});
		}else if(!req.body.password){
			res.json({ success: false, message: 'Please provide a password.'});
		}else {
			User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
				if(err){
					res.json({ success: false, message: 'Error occured finding username', err });
				}else if (!user) {
					res.json({ success: false, message: 'The username was not found. Try again.'});
				}else {
					const validPassword = user.comparePassword(req.body.password);
					if(!validPassword){
						res.json({ success: false, message: 'Password does not match. Try again.'});
					}else {
						const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24' });
						res.json({
							success: true,
							message: 'You are successfully logged in.',
							token: token,
							user: {
								username: user.username
							}
						})
					}
				}
			})
		}
	})

return router;
}
