const express = require('express');
const createAppointment = require('../controllers/createAppointment.js');
const router = express.Router();

router.post('/appointment', createAppointment);

module.exports = router;
