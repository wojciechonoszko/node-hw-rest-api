const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/users/signup', async (req, res, next) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email }, { _id: 1}).lean();

    if (userExists) {
        return res.status(409).json({ message: "User already exists "});
    }

    try {
        const newUser = new User({ username, email });
        await newUser.setPassword(password);
        await newUser.save();
        res.json("ok");
    } catch (error){
        next(error);
    }
});