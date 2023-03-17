const express = require('express');
const router = express.Router();

const { setPassword } = require('../../controllers/SetPassword/setPassword');

router.route('/Password').patch(setPassword);

module.exports = router;
