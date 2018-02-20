const User = require('../../model/user');
const Profile = require('../../model/profile');


module.exports = (router) => {

// ==========================================================
// 		 					ADD ABOUT
// ==========================================================

    router.put('/postAbout/:username', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username about')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No profile is found for the user. '});
            }else if(!req.body.about) {
                res.json({ success: false, message: 'The field is required.'});
            }else {
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec()
                .then(user => {
                    if(!user){
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(user.username !== profile.username){
                        res.json({ success: false, message: 'You are not authorized to update profile.'});
                    }else {
                       
                        profile.about = req.body.about;

                        profile.save((err) => {
                            if(!err){
                                res.json({ success: true, message: 'Profile succesfully updated.'});
                            }
                        });
                    }
                })
            }
        })

        .catch((err) => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    })




    return router;
}