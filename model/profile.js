const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;



// ==========================================================
// 		 			 VALIDATIONS
// ==========================================================
let lengthChecker = (value) => {
    if(!value){
        return null
    }else if(value.length > 100 || value.length < 2){
        return false;
    }
}


let validvalue = (value) => {
    if(!value){
        return null;
    }else {
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(value);
    }
}

let valueValidators = [
    {
        validator: lengthChecker,
        message: 'String must not be longer than 100 and less than 2 characters'
    }, 
    {
        validator: validvalue,
        message: 'String must not contain special characters.'
    }
]



// ==========================================================
// 		 			 SCHEMAS
// ==========================================================




// SKILLS 
const Skill = new Schema({
    language: { type: String, validate: valueValidators },
    level: { type: String },
    start: { type: Date }
});

// TOOLS 
const Tool = new Schema({
    tool: { type: String, validate: valueValidators },
    level: { type: String },
    start: { type: Date }
});


// PROJECT
const Project = new Schema({
    title: { type: String, validate: valueValidators },
    tech: { type: String, validate: valueValidators },
    link: { type: String }
});


// EXPERIANCE
const Experiance = new Schema({
    started: { type: Date },
    ended: { type: Date },
    company: { type: String, validate: valueValidators },
    position: { type: String, validate: valueValidators }
});


// EDUCATION
const Education = new Schema({
    started: { type: Date },
    ended: { type: String },
    school: { type: String, validate: valueValidators },
    major: { type: String, validate: valueValidators }
});





const ProfileSchema = new Schema({
    name: { type: String },
    email: { type: String },
    title: { type: String},
    image: { type: String},
    location: { type: String },
    about: { type: String, default: 'Say something about yourself.' },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    github: { type: String},
    objective: { type: String},
    username: { type: String },
    skill: [Skill],
    tool: [Tool],
    project: [Project],
    experiance: [Experiance],
    education: [Education]
});


module.exports = mongoose.model('Profile', ProfileSchema);