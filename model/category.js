const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let categoryLengthChecker = (category) => {
	if(!category){
		return false;
	}else if(category.length < 3 || category.length > 15){
		return false;
	}else {
		return true;
	}
}


// let validCategoryChecker = (category) => {
// 	if(!category){
// 		return false;
// 	}else {
// 		const regExp = new RegExp(/^[a-zA-Z ]+$/);
// 		return regExp.text(category);
// 	}
// }

let categoryValidators = [
	{
		validator: categoryLengthChecker,
		message: 'Category can not be less than 3 and no longer than 15'
	}
]


const CategorySchema = new Schema({
	category: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: categoryValidators
	}
});

module.exports = mongoose.model('Category', CategorySchema);
