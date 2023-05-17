const express = require('express');
const router = express.Router();

const {
	getTransID,
	getPaymentInfo,
	createTransQR,
	transQRVerify,
	getHistory,
	getLasTicket,
} = require('../../controllers/Transaction/transaction');

router.route('/id').post(getTransID);
router.route('/pay').post(getPaymentInfo);
router.route('/qr').post(createTransQR);
router.route('/qrverify').post(transQRVerify);
router.route('/history').post(getHistory);
router.route('/last-ticket').post(getLasTicket);

module.exports = router;
