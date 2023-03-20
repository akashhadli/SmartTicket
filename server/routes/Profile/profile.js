const express = require('express');
const router = express.Router();

const { Profile } = require('../../controllers/Profile/profile');

router.route('/').get(Profile);

module.exports = router;
