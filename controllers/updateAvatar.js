const { User } = require("../models/schemas/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

// const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const avatarsDir = path.join(process.cwd(), '/public/avatars');
// const updateAvatar = async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   //const { _id: id } = req.user;
//   const id = "1";
//   const imageName = `${id}_${originalname}`;
//   try {
//     const resultUpload = path.join(avatarsDir, imageName);
//     await fs.rename(tempUpload, resultUpload);
//     await Jimp.read(resultUpload)
//       .then((avatar) => {
//         return avatar.resize(250, 250).write(resultUpload);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     const avatarURL = path.join("public", "avatars", imageName);
//     await User.findByIdAndUpdate(id, { avatarURL });
//     res.json({ avatarURL });
//   } catch (error) {
//     await fs.unlink(tempUpload);
//     throw error;
//   }
// };

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    // const { _id } = req.user;
    const id = "6319c07cbf8bd2b46924baf2";
    // resizing avatar
    // const image = await Jimp.read(tempUpload);
    // image.resize(250, 250).writeAsync(tempUpload);
    const [extension] = originalname.split(".").reverse();
    const newName = `${id}.${extension}`;
    const resultDir = path.join(avatarsDir, newName);
    try {
      Jimp.read(tempUpload, (error, image) => {
        // !! truthy => true
        // !! falsey => false
        // !!"1" => true
        // !!"0" => true
        // !!0 => false
        if (!!error) {
          resolve(false);
        } else {
          image.rotate(360).resize(250, 250).greyscale().write(resultDir);
          //resolve(true);
        }
      });
    } catch (error) {
      next(error);
    }
  
    
    await fs.rename(tempUpload, resultDir);
    const avatarURL = path.join("avatars", newName);
    // await User.findByIdAndUpdate(id, { avatarURL });
    res.json({avatarURL,});
  };

module.exports = {updateAvatar};