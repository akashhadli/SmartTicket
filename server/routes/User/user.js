const express = require('express');
const router = express.Router();

const {
	register,
	profile,
	editprofile,
} = require('../../controllers/User/user');

router.route('/register').post(register);
router.route('/profile').get(profile);
router.route('/profile/edit').patch(editprofile);

module.exports = router;
