const User = require('../../model/user');
const Profile = require('../../model/profile');



module.exports = (router) => {

// ==========================================================
// 		 			    ADD TOOL
// ==========================================================

    router.post('/addTool/:username', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username tool')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No data was found for this username.'});
            }else if(!req.body.tool){
                res.json({ success: false, message: 'No tool was provided.'});
            }else if(!req.body.level){
                res.json({ success: false, message: 'You must choose a level.'});
            }else if(!req.body.start){
                res.json({ success: false, message: 'You must choose a date.'});
            }else if(profile.tool['tool'] === req.body.tool){
                res.json({ success: false, message: 'You already posted this tool.'});
            }else{
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec()
                .then(user => {
                    if(!user){
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(user.username !== profile.username) {
                        res.json({ success: false, message: 'You are not authorized to post in this profile.'});
                    }else {
                        profile.tool.push({
                            tool: req.body.tool,
                            level: req.body.level,
                            start: req.body.start
                        });
                        profile.save(err => {
                            if(!err){
                                res.json({ success: true, message: 'Successfully posted.'})
                            }
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    })

// ==========================================================
// 		 			    GET SINGLE TOOL
// ==========================================================
    router.get('/getSingleTool/:username/:id', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('tool')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'No tool is added by this user.'});
            }else {
                const singleTool = profile.tool.filter(index => index._id == req.params.id);
                res.json({ success: true, tool: singleTool[0] });
            }
        })
        .catch(err => {
            res.json({ success: false, message: 'Error occurred. ' + err });
        })
    });


// ==========================================================
// 		 			    UPDATE TOOL
// ==========================================================
    router.put('/updateTool/:username/:id', (req, res) => {
        Profile.findOne({ username: req.params.username })
        .select('username tool')
        .exec()
        .then(profile => {
            if(!profile){
                res.json({ success: false, message: 'Profile was not found for this user.'});
            }else {
                User.findOne({ _id: req.decoded.userId })
                .select('username')
                .exec()
                .then(user => {
                    if(!user){
                        res.json({ success: false, message: 'You must be logged in to continue.'});
                    }else if(user.username !== profile.username){
                        res.json({ success: false, message: 'You are not authorized to edit this profile. '});
                    }else {
                        let tool = profile.tool.filter(index => index._id == req.params.id)
                        tool[0].tool = req.body.tool;
                        tool[0].level = req.body.level;
                        tool[0].start = req.body.start;
                        profile.save((err) => {
                            if(!err){
                                res.json({ success: true, message: 'Tool successfully updated.'});
                            }
                        })
                    }
                })
            }
        })

        .catch((err) => {
            res.json({ success: false, message: 'Error occurred.' + err });
        })
    })


// ==========================================================
// 		 			    DELETE TOOL
// ==========================================================
router.delete('/deleteTool/:username/:id', (req, res) => {
    Profile.findOne({ username: req.params.username })
    .select('username tool')
    .exec()
    .then(profile => {
        if(!profile){
            res.json({ success: false, message: 'Profile was not found for this user.'});
        }else {
            User.findOne({ _id: req.decoded.userId })
            .select('username')
            .exec()
            .then(user => {
                if(!user){
                    res.json({ success: false, message: 'You must be logged in to continue.'});
                }else if(user.username !== profile.username){
                    res.json({ success: false, message: 'You are not authorized to delete this profile. '});
                }else {
                    let tool = profile.tool.filter(index => index._id == req.params.id);
                    let index = profile.tool.indexOf(tool);
                    profile.tool.splice(index, 1);
                    profile.save((err) => {
                        if(!err){
                            res.json({ success: true, message: 'Tool successfully deleted.'});
                        }
                    })
                }
            })
        }
    })

    .catch((err) => {
        res.json({ success: false, message: 'Error occurred.' + err });
    })
})





    return router;
}