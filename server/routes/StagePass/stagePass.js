const express = require('express');
const router = express.Router();

const { stagePass } = require('../../controllers/StagePass/stagePass');

router.route('/pass').post(stagePass);

module.exports = router;
