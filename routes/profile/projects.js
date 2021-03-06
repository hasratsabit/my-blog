const User = require('../../model/user');
const Profile = require('../../model/profile');



module.exports = (router) => {

// ==========================================================
// 		 			    ADD PROJECT
// ==========================================================

    router.post('/postProject/:username', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username project')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No profile is available for this user.'});
            }else if(!req.body.title){
                res.json({ success: false, message: 'The title field is required.'});
            }else if(!req.body.tech) {
                res.json({ success: false, message: 'The technology field is required.'});
            }else if(!req.body.link) {
                res.json({ success: false, message: 'The link field is required.'});
            }else{
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec()
                .then((user) => {
                    if(!user){
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(user.username !== profile.username ){
                        res.json({ success: false, message: 'You are not authorized to post in this profile.'});
                    }else if(profile.project['title'] === req.body.title){
                        res.json({ success: false, message: 'You already posted this project. '});
                    }else {
                        profile.project.push({
                            title: req.body.title,
                            tech: req.body.tech,
                            link: req.body.link
                        })

                        profile.save((err) => {
                            if(!err){
                                res.json({ success: true, message: 'Project successfully posted. '});
                            }
                        })
                    }
                })
            }
        })

        .catch((err) => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    })



// ==========================================================
// 		 			    GET SINGLE PROJECT
// ==========================================================

    router.get('/singleProject/:username/:id', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username project')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No profile is available for this user.'});
            }else {
                let singleProj = profile.project.filter((index) => index._id == req.params.id);
                res.json({ success: true, singleProj: singleProj[0]});
            }
        })

        .catch((err) => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    })











// ==========================================================
// 		 			    UPDATE PROJECT
// ==========================================================

    router.put('/updateProject/:username/:id', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username project')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No profile exist for this user. '});
            }else {
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec()
                .then(user => {
                    if(!user){
                        res.json({ success: false, message: 'User is not found.'});
                    }else if(user.username !== profile.username ) {
                        res.json({ success: false, message: 'You are not authorized to edit this profile. '});
                    }else {
                        let singleProject = profile.project.filter((index) => index._id == req.params.id);
                        singleProject[0].title = req.body.title;
                        singleProject[0].tech = req.body.tech;
                        singleProject[0].link = req.body.link;
                        profile.save((err) => {
                            if(!err){
                                res.json({ success: true, message: 'The project succesfully updated.'});
                            }
                        })
                    }
                })
            }
        })

        .catch((err) => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    })

// ==========================================================
// 		 			    DELETE PROJECT
// ==========================================================

    router.delete('/deleteProject/:username/:id', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username project')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ successc: false, message: 'No profile is available for this user.'});
            }else {
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec()
                .then(user => {
                    if(!user) {
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(user.username !== profile.username ){
                        res.json({ success: false, message: 'You are not authorized to delete this profject.'});
                    }else {
                        let singleProj = profile.project.filter((index) => index._id == req.params.id);
                        let index = profile.project.indexOf(singleProj);
                        profile.project.splice(index, 1);
                        profile.save((err) => {
                            if(!err){
                                res.json({ success: true, message: 'Project sucessfully deleted.'});
                            }
                        })
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