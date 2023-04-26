const express = require('express');
const router = express.Router();

const { getTicketTypes } = require('../../controllers/TicketType/tickettype');

router.route('/type').post(getTicketTypes);

module.exports = router;
