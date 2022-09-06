const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const { HttpCode } = require('../helpers/constants');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const shortFunc = require('../helpers/shortFunctions');

// Signup

const signup = async (req, res, next) => {
    const { email, password, subscription } = req.body;

    const userExists = await User.findOne({ email });

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
        const { email } = req.body;
        const user = await User.findOne({ email });
        await shortFunc.updateToken(user._id, null);

        return res.status(HttpCode.NO_CONTENT).json({
            status: 'success',
            code: HttpCode.NO_CONTENT,
        });
    } catch (error) {
        next(error);
    }
};

// Current
const current = async (req, res, next) => {
    // try {
    //     const { email, subscription } = await shortFunc.findByToken(req.user.token);

    //     return res.status(HttpCode.OK).json({
    //         status: 'success',
    //         code: HttpCode.OK,
    //         ResponseBody: { email, subscription },
    //     })
    // } catch (error) {
    //     next(error);
    // }
    const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription: req.user.subscription,
      },
    },
  });
};

module.exports = {signup, login, logout, current};