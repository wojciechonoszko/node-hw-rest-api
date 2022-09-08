const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/schemas/user');
const { HttpCode } = require('../helpers/constants');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const shortFunc = require('../models/shortFunctions');
const gravatar = require("gravatar");


const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

// Signup

const signup = async (req, res, next) => {
    const { email, password} = req.body;

    const userExists = await shortFunc.findByEmail(email);
    const avatarURL = gravatar.url(email);
    console.log(avatarURL);

    if (userExists) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            ResponseBody: { message: 'User already exists.' },
          });
    }

    try {
        const newUser = await User.create({
            ...req.body,
            avatarURL,
          });
    // const newUser = await User.create(req.body);
    const { email, subscription } = newUser;
    await newUser.setPassword(password);
    await newUser.save();

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      ResponseBody: { user: { email, subscription } },
    });
    } catch (error){
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await user.validatePassword(password);

        if (!user || !isPasswordCorrect) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Email or password is wrong',
            });
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '20h' });
        await shortFunc.updateToken(user._id, token);

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            ResponseBody: { token, user: { email, subscription: user.subscription }},
        }) 
    } catch (error){
        next(error);
    };
};

// Logout
const logout = async (req, res, next) => {
    try {
        const { email, _id } = req.body;
        const user = await User.findById();
        await User.findByIdAndUpdate(_id, {token: null});

        return res.status(HttpCode.NO_CONTENT).json({
            status: 'success',
            message: 'Email or password is wrong',
            code: HttpCode.NO_CONTENT,
            
        });
    } catch (error) {
        next(error);
    }
};



// Current
const current = async (req, res, next) => {
    try {
        const { email, subscription } = await shortFunc.findByToken(req.user.token);

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            ResponseBody: { email, subscription },
        })
    } catch (error) {
        next(error);
    }
    
};




module.exports = {signup, login, logout, current};