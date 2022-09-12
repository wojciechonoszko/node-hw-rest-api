const { User } = require('../models/schemas/user');
const { HttpCode } = require('../helpers/constants');
const shortFunc = require('../models/shortFunctions');
const {sendEmail} = require ('../../helpers/sendEmail');
const { handle } = require ('./verifyEmail.js');

const resendEmail = async (req, res, next) => {

    try {
        const { email } = req.body;

        if (!email) {
            res.json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                ResponseBody: { 
                    message: "Missing required email", 
        },
            })
        return;
        }
        const user = await Users.findByEmail(req.body.email);

        if (!user){
            res.json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                ResponseBody: { 
                    message: "User with this email is not found", 
        },
            })
        return;
        }
        if (user.verify) {
            res.json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                ResponseBody: { 
                    message: "Verification has already been passed", 
        },
            })
        return;
        }

        const result = await handle.verifyEmail(email, user.verifyToken);
        res.json({
            status: 'success',
            code: HttpCode.OK,
            ResponseBody: {
                message: 'Verification email sent'}
          });
        } catch (error) {
          next(error);
        }

    }
}