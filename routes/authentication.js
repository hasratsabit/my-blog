const User = require('../model/user');
const Profile = require('../model/profile');
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
				username: req.body.username.toLowerCase(),
				email: req.body.email.toLowerCase(),
				password: req.body.password
			});

			const profile = new Profile({
				username: req.body.username,
				name: req.body.name,
				email: req.body.email
			});

			profile.save((err) => {
				if(err){
					res.json({ success: false, message: 'Error occurred saving profile.' + err});
				}else {
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
		// Check if the user provided username.
		if(!req.body.username){
			// Respond if the user didn't provide username.
			res.json({ success: false, message: 'Please provide a username.'});
			// Check if the user provided password.
		}else if(!req.body.password){
			// Respond if the user didn't provide password.
			res.json({ success: false, message: 'Please provide a password.'});
		}else {
			// Find the user by username provided by user.
			User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
				// Check if there is any error.
				if(err){
					// Respond if there is any error.
					res.json({ success: false, message: 'Error occured finding username', err });
					// Check if the user exist in the database.
				}else if (!user) {
					// Respond if the user is not found in database.
					res.json({ success: false, message: 'The username was not found. Try again.'});
				}else {
					// Compare the password provided by user with one in database.
					const validPassword = user.comparePassword(req.body.password);
					// Check if the password matches the password in database.
					if(!validPassword){
						// Respond if the password does not match one in database.
						res.json({ success: false, message: 'Password does not match. Try again.'});
					}else {
						const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
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


// ==========================================================
// 		 			TOKEN MIDDLEWARE
// ==========================================================

	router.use((req, res, next) => {
		// Assign the headers coming from client to variable.
		const token = req.headers['authorization'];
		// Check if the token is passed.
		if(!token){
			// Respond if the token is not provided.
			res.json({ success: false, message: 'No token was provided'});
		}else {
			// Verify the token using jwt verify method.
			jwt.verify(token, config.secret, (err, decoded) => {
				// Check if any error verifying token.
				if(err){
					// Respond if the token is not varified.
					res.json({ success: false, message: 'Invalid token:' + err });
				}else {
					req.decoded = decoded; // Assign the decrypted token to a global variable.
					next(); // Exit the function.
				}
			});
		}
	});






return router;
}
