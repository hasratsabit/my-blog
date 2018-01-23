const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

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

const CommentSchema = new Schema({
    authorName: { type: String, required: true },
    authorUsername: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    blogId: { type: String, required: true },
    comment: { type: String, required: true, validate: commentValidators },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array},
    replies: [{
        authorName: { type: String },
        authorUsername: { type: String },
        comment: { type: String, validate: commentValidators},
        likes: { type: Number, default: 0 },
        likedBy: { type: Array },
        dislikes: { type: Number, default: 0 },
        dislikedBy: { type: Array},
    }]
});



module.exports = mongoose.model('Comment', CommentSchema);