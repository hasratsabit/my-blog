const User = require('../../model/user');
const Profile = require('../../model/profile');
const upload = require('../../model/upload');
const fs = require('fs');


module.exports = (router) => {

// ==========================================================
// 		 					UPDATE USER BIO
// ==========================================================
    router.put('/updateBio/:username', (req, res) => {
        // Check for username in the url.
        if(!req.params.username){
            // Respond if no username is provided.
            res.json({ success: false, message: 'No username was provided.'});
        }else {
            // Find the username by profile.
            Profile.findOne({ username: req.params.username }, (err, profile) => {
                if(err){
                    // Respond if error.
                    res.json({ success: false, message: 'Error occurred finding profile.' + err });
                }else if(!profile){
                    // Respond if no profile is found.
                    res.json({ success: false, message: 'No profile found for this user.'});
                }else {
                    // Find the user using the token.
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if(err){
                            // Respond if error.
                            res.json({ success: false, message: 'Error occurred finding user.' + err });
                        }else if(!user){
                            // Respond if no user is found.
                            res.json({ success: false, message: 'You must be logged in to continue.'});
                            // Check if the user is authorized to update the profile.
                        }else if(user.username !== profile.username ){
                            // Respond if the user is not authorized.
                            res.json({ success: false, message: 'You are not authorized to update this profile.'});
                        }else {
                            // Update the profile object.
                            profile.title = req.body.title;
                            profile.location = req.body.location;
                            profile.twitter = req.body.twitter;
                            profile.linkedin = req.body.linkedin;
                            profile.github = req.body.github;
                            // Save the profile.
                            profile.save((err) => {
                                // Check for error.
                                if(err){
                                    // Respond if error
                                    res.json({ success: false, message: 'Error occurred updating profile.'});
                                }else {
                                    // Respond with success.
                                    res.json({ success: true, message: 'Your profile successfully updated.'});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
 

// ==========================================================
// 		 					UPDATE PROFILE PICTURE
// ==========================================================
    router.put('/updateProfileImage/:username', upload.single('profileImage'), (req, res) => {
        // Check for username in the url.
        if(!req.params.username){
            // Respond if no username is provided.
            res.json({ success: false, message: 'No username was provided.'});
            // Check for file.
        }else if(!req.file){
            // Respond if no file is provided.
            res.json({ success: false, message: 'No file provided.'});
        }else {
            // Find the profile using username
            Profile.findOne({ username: req.params.username })
            .select('image username') // Choose the image and username.
            .exec((err, profile) => { // Find the profile.
                if(err){
                    // Respond if error occurred.
                    res.json({ success: false, message: 'Error occurred finding the user profile.' + err });
                }else if(!profile){
                    // Respond if no profile is found.
                    res.json({ success: false, message: 'The profil do not exist. '});
                }else {
                    // Find the user.
                    User.findOne({ _id: req.decoded.userId })
                    .select('username') // Select only the username.
                    .exec((err, user) => {
                        if(err){
                            // Respond if there is any error.
                            res.json({ success: false, message: 'Error occurred finding the user. ' + err });
                        }else if(!user) {
                            // Respond if no user is found.
                            res.json({ success: false, message: 'The user was not found. '});
                            // Check if the user is authorized to change the profile picture.
                        }else if(profile.username !== user.username){
                            // Respond if the user is not authorized.
                            res.json({ success: false, message: 'You are not authorized to change the profile picture for this user.'});
                        // Check if there is already a profile image of the user.
                        }else {
                            
                            if(profile.image){
                                fs.unlink(profile.image, (err) => {
                                    if(err){
                                        console.log(err);
                                    }else {
                                        profile.image = req.file.path;
                                        // Save the profile object.
                                        profile.save((err) => {
                                            if(err){
                                                // Respond if any error.
                                                res.json({ success: false, message: 'Error occurred saving the user.' + err });
                                            }else {
                                                // Respond with success.
                                                res.json({ success: true, message: 'Your profile image successfully uploaded.'});
                                            }
                                        });
                                    }
                                });
                            }else {
                                profile.image = req.file.path;
                                // Save the profile object.
                                profile.save((err) => {
                                    if(err){
                                        // Respond if any error.
                                        res.json({ success: false, message: 'Error occurred saving the user.' + err });
                                    }else {
                                        // Respond with success.
                                        res.json({ success: true, message: 'Your profile image successfully uploaded.'});
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
// 		 					DELETE PROFILE
// ==========================================================
    router.delete('/deleteProfile/:username', (req, res) => {
        Profile.findOne({ username: req.params.username }) // Find profile by username.
        .exec() 
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No profile is found for this user.'});
            }else {
                User.findOne({ _id: req.decoded.userId }) // Find the logged in user
                .select('username userRole')
                .exec()
                .then(user => {
                    if(!user){
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(profile.username !== user.username || user.userRole !== 'admin'){
                        res.json({ success: false, message: 'You are not authorized to delete this user.'})
                    }else {

                        // If the user has image, delete it.
                        if(profile.image){
                            fs.unlink(profile.image, (err) => {
                                if(err){
                                    res.json({ success: false, message:'Error occurred deleting user image.' + err});
                                }
                            });
                        }

                        // First remove the profile data.
                        profile.remove((err) => {
                            if(!err){
                                // Second, remove the user data.
                                user.remove((err) => {
                                    if(!err){
                                        res.json({ success: true, message: 'Your profile successfully deleted.'});
                                    }
                                })
                            }
                        });
                    }
                }).catch(err => {
                    res.json({ success: false, message: 'Error occurred finding user.' + err });
                    console.log(err);
                })
            }
        })

        .catch((err) => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    });


// ==========================================================
// 		 		    GET LOGIN USER PROFILE
// ==========================================================

    router.get('/loginUser', (req, res) => {
        User.findOne({ _id: req.decoded.userId })
        .select('username')
        .then(user => {
            if(!user){
                res.json({ success: false, message: 'You must be logged in to continue.'});
            }else {
                Profile.findOne({ username: user.username })
                .select('name username image title')
                .then(profile => {
                    if(!profile){
                        res.json({ success: false, message: 'There is no profile for the user.'});
                    }else {
                        res.json({ success: true, profile: profile });
                    }
                })
                .catch(err => {
                    res.json({ success: false, message: 'Error occurred finding profile. ' + err });
                })
            }
        })
        .catch(err => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    })

    return router;
}