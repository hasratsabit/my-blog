const User = require('../model/user');
const Category = require('../model/category');
const jwt = require('jsonwebtoken');

const config = require('../config/database');


module.exports = (router) => {

	 router.post('/postCategory', (req, res) => {
		if(!req.body.category){
			res.json({ success: false, message: 'No category was provided.'});
		}else {
			User.findOne({ _id: req.decoded.userId }, (err, user) => {
				if(err){
					res.json({ success: false, message: 'Error occured finding user', err})
				}else if(!user) {
					res.json({ success: false, message: 'You must be logged in to create categories.'});
				}else if (user.adminAccess === false) {
					res.json({ success: false, message: 'You are not an authorized adminstrator to create category.'});
				}else {
					let category = new Category({
						category: req.body.category
					});

					category.save((err) => {
						if(err){
							if(err.code === 11000) {
								res.json({ success: false, message: 'The category already exist.'})
							}else {
								if(err.errors){
									if(err.errors.category){
										res.json({ success: false, message: err.errors.category.message });
									}else {
										res.json({ success: false, message: err });
									}
								}else {
									res.json({ success: false, message: 'Cannot save category: ', err});
								}
							}
						}else {
							res.json({ success: true, message: 'Category successfully saved.'});
						}
					})
				}
			})
		}
	});

	router.get('/getAllCategories', (req, res) => {
		Category.find({}, (err, cat) => {
			if(err){
				res.json({ success: false, message: 'Error occured finding categories' + err });
			}else {
				res.json({ success: true, cat: cat });
			}
		})
	});


	router.get('/getSingleCategory/:id', (req, res) => {
		if(!req.params.id){
			res.json({ success: false, message: 'No category id was provided.'});
		}else {
			Category.findOne({ _id: req.params.id }, (err, cat) => {
				if(err){
					res.json({ success: false, message: 'Error occured finding the category.' + err });
				}else {
					res.json({ success: true, cat: cat });
				}
			})
		}
	});


	router.put('/updateCategory', (req, res) => {
		if(!req.body._id){
			res.json({ success: false, message: 'No category id was provided.'});
		}else {
			Category.findOne({ _id: req.body._id }, (err, cat) => {
				if(err){
					res.json({ success: false, message: 'Error ocurred finding the category.' + err });
				}else if (!cat) {
					res.json({ success: false, message: 'This category is not found in database. '});
				}else {
					User.findOne({ _id: req.decoded.userId }, (err, user) => {
						if(err){
							res.json({ success: false, message: 'Error occured finding the user. ' + err });
						}else if(!user){
							res.json({ success: false, message: 'You must be logged in to continue.'});
						}else if (user.adminAccess === false) {
							res.json({ success: false, message: 'You are not an authoried admin to edit this category.'});
						}else {
							cat.category = req.body.category;
							cat.save((err) => {
								if(err){
									res.json({ success: false, message: 'Error occured saving category.' + err });
								}else {
									res.json({ success: true, message: 'Category successfully updated.'});
								}
							})
						}
					})
				}
			})
		}
	})


	router.delete('/deleteCategory/:id', (req, res) => {
		if(!req.params.id){
			res.json({ success: false, message: 'No category id was provided.'})
		}else {
			Category.findOne({ _id: req.params.id }, (err, cat) => {
				if(err){
					res.json({ success: false, message: 'Error occured finding the category.' + cat });
				}else if(!cat){
					res.json({ success: false, message: 'This category does not exist in database.'});
				}else {
					User.findOne({ _id: req.decoded.userId }, (err, user) => {
						if(err){
							res.json({ success: false, message: 'Error occured finding user.' + err });
						}else if (!user) {
							res.json({ success: false, message: 'You must be logged in to continue.'});
						}else if (user.adminAccess === false) {
							res.json({ success: false, message: 'You are not authorized to delete this category.'})
						}else {
							cat.remove((err) => {
								if(err){
									res.json({ success: false, message: 'Error occured deleting category.' + err });
								}else {
									res.json({ success: true, message: 'Category successfully deleted.'});
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
