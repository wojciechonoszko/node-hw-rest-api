const { User } = require('../models/schemas/user');
const { HttpCode } = require('../helpers/constants');
const shortFunc = require('../models/shortFunctions');
const {sendEmail} = require ('../helpers/sendEmail');
// const  handle  = require ('./verifyEmail.js');
const { v4 } = require("uuid");

const resendEmail = async (req, res, next) => {

    try {
        const { email } = req.body;
        const verificationToken = v4();

        if (!email) {
            res.json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                ResponseBody: { 
                    message: "Missing required field email", 
        },
            })
        return;
        }
        const user = await shortFunc.findByEmail(email);

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

        // const result = await handle.sendEmail(email, verificationToken);
        const mail = {
            to: email,
            subject: "Confirm your email again, please.",
            html: `a href="http://localhost:8155/api/users/verify/:${verificationToken}" target="_blank">Click to confirm email</a>`,
        };
        await sendEmail(mail);
        res.json({
            status: 'success',
            code: HttpCode.OK,
            ResponseBody: {
                message: 'Verification email sent'}
          });
        } catch (error) {
          next(error);
        }  
};

module.exports = { resendEmail };