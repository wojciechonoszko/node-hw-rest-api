const express = require('express');
const router = express.Router();

const ctrl = require('../../../controllers/user');
const middleAuth = require('../../../middleware/authorization');
const upload = require('../../../middleware/upload');


const { validateUserSignup, validateUserLogin } = require('./validation');



router.post('/signup', validateUserSignup, ctrl.signup); 
router.post('/login', validateUserLogin, ctrl.login);
router.post('/logout', middleAuth, ctrl.logout);
router.get('/current', middleAuth, ctrl.current); 
router.patch("/avatars", upload.single("avatar"), ctrl.updateAvatar);



module.exports = router