const express = require('express');
const router = express.Router();
const { geocodingController } = require('../controllers');

// GET /api/geocode - Geocode an address
router.get('/', geocodingController.geocodeAddress);

// GET /api/geocode/reverse - Reverse geocode coordinates
router.get('/reverse', geocodingController.reverseGeocode);

// GET /api/geocode/event - Geocode event location (GTA-specific)
router.get('/event', geocodingController.geocodeEventLocation);

module.exports = router;
