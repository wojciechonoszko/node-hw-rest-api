const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const { HttpCode } = require('../helpers/constants');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Signup

const signup = async (req, res, next) => {
    const { email, password, subscription } = req.body;

    const userExists = await User.findOne({ email }).lean();

    if (userExists) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            ResponseBody: { message: 'User already exists.' },
          });
    }

    try {
        const newUser = await User.create(req.body);
    const { email, subscription } = newUser;

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      ResponseBody: { user: { email, subscription } },
    });
    } catch (error){
        next(error);
    }
};

module.exports = {signup};