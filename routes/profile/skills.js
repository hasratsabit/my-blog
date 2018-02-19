const User = require('../../model/user');
const Profile = require('../../model/profile');



module.exports = (router) => {

// ==========================================================
// 		 			    ADD SKILL
// ==========================================================

    router.post('/addSkill/:username', (req, res) => {
        if(!req.params.username){
            res.json({
                success: false,
                message: 'No username was provided.'
            });
        }else if(!req.body.language){
            res.json({
                success: false,
                message: 'No skill was provided.'
            });
        }else if(!req.body.level){
            res.json({ 
                success: false, 
                message: 'Please, provide what level you are.'
            });
        }else if(!req.body.start){
            res.json({ 
                success: false, 
                message: 'Please, tell us when you first started using this skill.'
            });
        }else {
            // Find the profile by username.
            Profile.findOne({ username: req.params.username })
            .select('skill username') // Choose the skill array and username.
            .exec((err, profile) => {
                if(err){
                    res.json({
                        success: false,
                        message: 'Error occurred finding the skill' + err
                    });
                }else if(!profile){
                    res.json({
                        success: false,
                        message: 'This section is not available.'
                    });
                }else {
                    // Find the logged in user.
                    User.findOne({ _id: req.decoded.userId })
                    .select('username')
                    .exec((err, user) => {
                        if(err){
                            res.json({ 
                                success: false, 
                                message: 'Error occurred finding the user.'
                            });
                        }else if(!user){
                            res.json({
                                success: false,
                                message: 'You must be logged in to continue.'
                            });
                            // check if the profile username is the same as the log in username.
                        }else if(user.username !== profile.username){
                            res.json({
                                success: false,
                                message: 'You are not authorized to update this user.'
                            });
                        }else {
                            // Push the data to the array.
                            profile.skill.push({
                                language: req.body.language,
                                level: req.body.level,
                                start: req.body.start
                            });
                            // Save the data.
                            profile.save((err) => {
                                if(err){
                                    // Check if it is database validation.
                                   if(err.errors){
                                       if(err.errors.language){
                                           res.json({
                                               success: false,
                                               message: err.errors.language.message
                                           })
                                       }else if(err.errors.level){
                                           res.json({
                                               success: false,
                                               message: err.errors.level.message
                                           })
                                       }else {
                                           res.json({
                                               success: false, 
                                               message: 'Error occurred  saving skills.'
                                           })
                                       }
                                   }else {
                                       res.json({
                                           success: false,
                                           message: 'Error occurred.'
                                       })
                                   }
                                }else {
                                    res.json({
                                        success: true,
                                        message: 'Skill successfully saved.'
                                    })
                                }
                            })
                        }
                    });
                }
            });
        }
    });


// ==========================================================
// 		 			        GET SINGLE SKILL
// ==========================================================

    router.get('/getSingleSkill/:username/:id', (req, res) => {
        // Check for username.
        if(!req.params.username){
            res.json({ success: false, message: 'No username was provided.'});
        }else if(!req.params.id){
            res.json({ success: false, message: 'No skill id was provided.'});
        }else {
            // Find the profile by username.
            Profile.findOne({ username: req.params.username })
            .select('username skill') // Choose the skill and username
            .exec((err, profile) => {
                if(err){
                    res.json({ success: false, message: 'Error occurred finding profile.' + err });
                }else if(!profile){
                    res.json({ success: false, message: 'No profile was found.'});
                }else {
                    // Find the single skill from the array using the id.
                    let skill = profile.skill.filter(index => index._id == req.params.id);
                    res.json({ success: true, skill: skill[0] }); // Respond with success and single skill.
                }
            });
        }
    });




// ==========================================================
// 		 			        EDIT SKILL
// ==========================================================

    router.put('/updateSkill/:username/:id', (req, res) => {
        if(!req.params.username){
            res.json({ success: false, message: 'No username was provided.'});
        }else if(!req.params.id){
            res.json({ success: false, message: 'No skill id was provided.'});
        }else {
            Profile.findOne({ username: req.params.username })
            .select('username skill')
            .exec((err, profile) => {
                if(err){
                    res.json({ success: false, message: 'Error occurred finding profile.' + err });
                }else if(!profile){
                    res.json({ success: false, message: 'No profile was found.'});
                }else {
                    User.findOne({ _id: req.decoded.userId })
                    .select('username')
                    .exec((err, user) => {
                        if(err){
                            res.json({ success: false, message: 'Error occurred finding user. ' + err });
                        }else if(!user){
                            res.json({ success: false, message: 'You must be logged in to continue.'});
                        }else if(user.username !== profile.username){
                            res.json({ success: false, message: 'You are not authorized to edit this profile.'});
                        }else {
                            let skill = profile.skill.filter(index => index._id == req.params.id);
                            skill[0].language = req.body.language;
                            skill[0].level = req.body.level;
                            skill[0].start = req.body.start;
                            profile.save((err) => {
                                if(err){
                                    res.json({ success: false, message: 'Error occurred updating skill.' + err});
                                }else {
                                    res.json({ success: true, message: 'Skill successfully updated.'});
                                }
                            });
                        }
                    });
                }
            });
        }
    });


// ==========================================================
// 		 			        DELETE SKILL
// ==========================================================

router.delete('/deleteSkill/:username/:id', (req, res) => {
    if(!req.params.username){
        res.json({ success: false, message: 'No username was provided.'});
    }else if(!req.params.id){
        res.json({ success: false, message: 'No skill id was provided.'});
    }else {
        Profile.findOne({ username: req.params.username })
        .select('username skill')
        .exec((err, profile) => {
            if(err){
                res.json({ success: false, message: 'Error occurred finding profile.' + err });
            }else if(!profile){
                res.json({ success: false, message: 'No profile was found.'});
            }else {
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec((err, user) => {
                    if(err){
                        res.json({ success: false, message: 'Error occurred finding user. ' + err });
                    }else if(!user){
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(user.username !== profile.username){
                        res.json({ success: false, message: 'You are not authorized to delete this profile.'});
                    }else {
                        let skill = profile.skill.filter(index => index._id == req.params.id);
                        let index = profile.skill.indexOf(skill);
                        profile.skill.splice(index, 1);
                        profile.save((err) => {
                            if(err){
                                res.json({ success: false, message: 'Error occurred updating skill.' + err});
                            }else {
                                res.json({ success: true, message: 'Skill successfully deleted.'});
                            }
                        });
                    }
                });
            }
        });
    }
});
    return router;
}
