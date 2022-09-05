const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const router = express.Router();

const signup = async (req, res, next) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }).lean();

    if (userExists) {
        return res.status(409).json({ message: "User already exists "});
    }

    try {
        const newUser = new User({ email, password});
        await newUser.setPassword(password);
        await newUser.save();
        res.json("ok");
    } catch (error){
        next(error);
    }
};

module.exports = signup;