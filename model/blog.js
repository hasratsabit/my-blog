const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// Checks the lenght of the title. 
let titleLengthChecker = (title) => {
    if(!title) {
        return false // Return false if no title 
    }else if(title.length < 3 || title.length > 100){
        return false; // Return false if the title is smaller than 3 and larger than 100 charaters. 
    }else {
        return true; // Return true if all tests are passed. 
    }
}

// Check if it is a valid title. 
let validTitleChecker = (title) => {
    if(!title) {
        return false; // Return false if no title. 
    } else {
        // Regular expression to test for a valid title
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title); // Return the result of passed expression.
    }
}

// Array contains Error for title lenght and validity.
let titleValidators = [
    {
        validator: titleLengthChecker,
        message: 'The title must not be less than 3 and more than 100 characters',
    },
    {
        validator: validTitleChecker,
        message: 'Title must not contain special characters.'
    }
]


// Checks the body length
let bodyLengthChecker = (body) => {
    if(!body) {
        return false; // Return false if no body is provided. 
    }else if(body.length < 50 || body.length > 5000) {
        return false; // Return false if the body is smaller than 50 and larger than 2000 characters. 
    }else {
        return true; // Return true if all tests are passed. 
    }
}

// Body validator array.
let bodyValidator = [
    {
        validator: bodyLengthChecker,
        message: 'Body must be at least 50 characters but no more than 5000 character.'
    }
]


let commentLengthChecker = (comment) => {
    if(!comment){
        return false // No comment 
    }else if(comment.length < 3 || comment.length > 2000){
        return false;
    }else {
        return true;
    }
}

let commentValidators = [
    {
        validator: commentLengthChecker,
        message: 'Comment must be at least three characters but no longer than 2000 character.'
    }
]

const ReplySchema = new Schema({
    authorName: { type: String },
    authorUsername: { type: String },
    comment: { type: String},
    date: { type: Date, default: Date.now()},
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array},
});

const CommentSchema = new Schema({
    authorName: { type: String },
    authorUsername: { type: String },
    date: { type: Date, default: Date.now() },
    comment: { type: String},
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array},
    replies: [ReplySchema]
})


const BlogSchema = new Schema({
    title: { type: String, required: true, validate: titleValidators },
    body: { type: String, required: true, validate: bodyValidator },
    date: { type: Date, default: Date.now() },
    author: { type: String, required: true },
    authorUsername: { type: String },
    imagePath: { type: String},
    category: { type: String },
    blogStatus: { type: String, default: 'draft'},
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    viewCounter: { type: Number, default: 0 },
    shareCounter: { type: Number, default: 0 },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Blog', BlogSchema)