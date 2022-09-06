// const { User } = require('../models/user');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 
// const { HttpCode } = require('../helpers/constants');

// const middleAuth = async (req, res, next) => {
//     const { authorization = '' } = req.headers;
//     const [bearer, token] = authorization.split(' ');
//     try {
//         if (bearer !== "Bearer") {
//             return res.status(HttpCode.UNAUTHORIZED).json({
//                 status: 'error',
//                 code: HttpCode.UNAUTHORIZED,
//                 message: "Not authorized",
//             });
//         };
//         const { id } = jwt.verify(token, JWT_SECRET_KEY);
//         const user = await User.findOne(id);
//         if (!user || !user.token) {
//             return res.status(HttpCode.UNAUTHORIZED).json({
//                 status: 'error',
//                 code: HttpCode.UNAUTHORIZED,
//                 message: "Not authorized",
//             });
//         };
//         req.user = user;
//         next()
//     } catch (error) {
//         if (error.message === "Invalid signature") {
//             return res.status(HttpCode.UNAUTHORIZED).json({
//                 status: 'error',
//                 code: HttpCode.UNAUTHORIZED,
//                 message: "Not authorized",
//             });
//         }
//         next(error);
//     }
// };

const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('../helpers/constants');


const middleAuth = (req, res, next) => {
  
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null;

    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1];
    }

    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        ResponseBody: {
          message: 'Not authorized',
        },
        
      });
    }
    req.user = user;

    return next();
  })(req, res, next);
};

module.exports = middleAuth;
