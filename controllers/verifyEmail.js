const { User } = require('../models/schemas/user');
const { HttpCode } = require('../helpers/constants');

const verifyEmail = async (req, res) => {
    const {verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw new HttpCode.NOT_FOUND("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    })

    return res.json({
        status: 'success',
        code: HttpCode.OK,
        ResponseBody: { 
            message: "Verification succesful", 
        },
      });
};

module.exports = { verifyEmail }