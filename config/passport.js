const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const shortFunc = require('../helpers/shortFunctions');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await shortFunc.findById(payload._id);

      if (!user) {
        return done(new Error('User not found'), false);
      }

      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);