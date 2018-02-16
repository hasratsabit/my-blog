const User = require('../../model/user');
const Profile = require('../../model/profile');
const Category = require('../../model/category');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../../config/database');

// Sub Routes
const personalRoute = require('./personal')(router);
const skillsRoute = require('./skills')(router);

module.exports = (router) => {
    router.use('/personal', personalRoute);
    router.use('/skills', personalRoute);

    return router;
}
