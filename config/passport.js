const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const shortFunc = require('../models/shortFunctions');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findOne({ _id: payload._id })
      .then((user) => {
        console.log(user);
        if (!user) {
          return done(new Error("user not found"));
        }
        return done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  })
);