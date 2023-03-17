const express = require('express');
const router = express.Router();

const {
  createOperator,
  getAllOperators,
  getOperators,
  validateOperator,
  createAsset,
} = require('../../controllers/Operator/operator');

router.route('/create').post(createOperator);
router.route('/read').get(getAllOperators);
router.route('/:OperId').get(getOperators);
router.route('/validate').post(validateOperator);
router.route('/astcreate').post(createAsset);

module.exports = router;
