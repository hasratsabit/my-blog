const User = require('../../model/user');
const Profile = require('../../model/profile');
const Category = require('../../model/category');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../../config/database');

// Sub Routes
const personalRoute = require('./personal')(router);


router.use('/personal', personalRoute);


module.exports = router;
