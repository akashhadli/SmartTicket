const express = require('express');
const router = express.Router();

const { Profile } = require('../../controllers/Profile/profile');

router.route('/').post(Profile);

module.exports = router;
