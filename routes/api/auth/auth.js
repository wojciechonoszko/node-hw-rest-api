const express = require('express');
const router = express.Router();

const ctrl = require('../../../controllers/user');
const ctrlAvatar = require('../../../controllers/updateAvatar');
const ctrlEmail = require('../../../controllers/verifyEmail')

const middleAuth = require('../../../middleware/authorization');
const upload = require('../../../middleware/upload');


const { validateUserSignup, validateUserLogin } = require('./validation');



router.post('/signup', validateUserSignup, ctrl.signup); 
router.post('/login', validateUserLogin, ctrl.login);
router.post('/logout', middleAuth, ctrl.logout);
router.get('/current', middleAuth, ctrl.current); 
router.patch("/avatars", upload.single("avatar"), ctrlAvatar.updateAvatar);
router.get("/verify/:verificationToken", ctrlEmail.verifyEmail);



module.exports = router