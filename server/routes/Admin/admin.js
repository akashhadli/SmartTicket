const express = require('express');
const router = express.Router();

const {
	login,
	createAdmin,
	getAllAdmins,
	getInactiveOperators,
	resetPassword,
	deleteAdmin,
	approveOperator,
	getAllAssets,
	getAllOperators,
	getAllEmployees,
	getAllUsers,
	getAllTransactions,
} = require('../../controllers/Admin/admin');

router.route('/login').post(login);
router.route('/create').post(createAdmin);
router.route('/read').get(getAllAdmins);
router.route('/inactiveopers').get(getInactiveOperators);
router.route('/update/:id').patch(resetPassword);
router.route('/update/:id').delete(deleteAdmin);
router.route('/approve/:OperId').patch(approveOperator);
router.route('/assets').get(getAllAssets);
router.route('/operators').get(getAllOperators);
router.route('/employees').get(getAllEmployees);
router.route('/users').get(getAllUsers);
router.route('/transactions').get(getAllTransactions);

module.exports = router;
