const express = require('express');
const router = express.Router();

const {
	getTransID,
	getPaymentInfo,
	createTransQR,
} = require('../../controllers/Transaction/transaction');

router.route('/id').post(getTransID);
router.route('/pay').post(getPaymentInfo);
router.route('/qr').post(createTransQR);

module.exports = router;