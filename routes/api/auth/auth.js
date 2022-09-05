const express = require('express');
const router = express.Router();

const ctrl = require('../../../controllers/user');
const guard = require('../../../helpers/guard');
// const jwt = require('jsonwebtoken');
// const User = require('../../../models/user');

const { validateUserSignup, validateUserLogin } = require('./validation');



router.post('/signup', validateUserSignup, ctrl.signup); 
// router.post('/users/login', validateUserLogin, ctrl.login);


// router.post('/users/signup', validateUserSignup, async (req, res, next) => {

module.exports = router