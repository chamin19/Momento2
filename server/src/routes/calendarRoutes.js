const express = require('express');
const router = express.Router();
const { calendarController } = require('../controllers');

// GET /api/calendar/auth - Get OAuth URL
router.get('/auth', calendarController.getAuthUrl);

// GET /api/calendar/callback - Handle OAuth callback
router.get('/callback', calendarController.handleCallback);

// POST /api/calendar/events - Add event to calendar
router.post('/events', calendarController.addToCalendar);

// GET /api/calendar/:grantId/calendars - Get user calendars
router.get('/:grantId/calendars', calendarController.getCalendars);

// DELETE /api/calendar/:grantId/events/:eventId - Remove event from calendar
router.delete('/:grantId/events/:eventId', calendarController.removeFromCalendar);

module.exports = router;
