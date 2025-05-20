const express = require('express');
const { getStats, getDeviation } = require('../controllers/statsController');

const router = express.Router();

// GET /stats
router.get('/stats', getStats);

// GET /deviation
router.get('/deviation', getDeviation);

module.exports = router;