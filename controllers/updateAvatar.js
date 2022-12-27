const { User } = require("../models/schemas/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { HttpCode } = require('../helpers/constants');

const avatarsDir = path.join(process.cwd(), '/public/avatars');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const id = req.user;
    
    const [extension] = originalname.split(".").reverse();
    const newName = `${id}.${extension}`;
    const resultDir = path.join(avatarsDir, newName);
    try {
      Jimp.read(tempUpload, (error, image) => {
        if (error) {
          throw error;
        } else {
          image
          .rotate(45)
          .quality(60)
          .resize(250, 250)
          .greyscale()
          .write(resultDir);
          
        }
      });
    } catch (error) {
      next(error);
    }
  
    
    await fs.rename(tempUpload, resultDir);
    const avatarURL = path.join("avatars", newName);
    
    
    if (avatarURL) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        ResponseBody: { avatarURL },
      });
    }
    return res.json({
      status: 'unsuccessful',
      code: HttpCode.UNAUTHORIZED,
      ResponseBody: {
        message: 'Not authorized',
      },
    });

  await User.findByIdAndUpdate(id, { avatarURL });
  };

module.exports = {updateAvatar};