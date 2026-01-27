const express = require('express');
const router = express.Router();
const { eventController } = require('../controllers');

// GET /api/events - Get all events with filters
router.get('/', eventController.getAllEvents);

// GET /api/events/upcoming - Get upcoming events
router.get('/upcoming', eventController.getUpcomingEvents);

// GET /api/events/categories - Get all categories
router.get('/categories', eventController.getCategories);

// GET /api/events/tags - Get all tags
router.get('/tags', eventController.getTags);

// GET /api/events/:id - Get single event
router.get('/:id', eventController.getEventById);

// POST /api/events - Create new event
router.post('/', eventController.createEvent);

// PUT /api/events/:id - Update event
router.put('/:id', eventController.updateEvent);

// DELETE /api/events/:id - Delete event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
