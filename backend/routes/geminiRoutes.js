const express = require('express');
const router = express.Router();
const { fetchSchemes, getSavedSchemes } = require('../controllers/geminiController');
const protect = require('../middleware/authMiddleware');

router.get('/fetch',  protect, fetchSchemes);     // promp chalane wala route
router.get('/saved',  protect, getSavedSchemes);  // returns saved schemes

module.exports = router;