const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 
const { HttpCode } = require('../helpers/constants');

const middleAuth = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    try {
        if (bearer !== "Bearer") {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: "Not authorized",
            });
        };
        const { id } = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findOne(id);
        if (!user || !user.token) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: "Not authorized",
            });
        };
        req.user = user;
        next()
    } catch (error) {
        if (error.message === "Invalid signature") {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: "Not authorized",
            });
        }
        next(error);
    }
};

module.exports = middleAuth;
