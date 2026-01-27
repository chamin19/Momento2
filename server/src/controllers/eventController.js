const { eventService } = require('../services');

// Get all events with filters
const getAllEvents = async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      city: req.query.city,
      tags: req.query.tags ? req.query.tags.split(',') : null,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const result = await eventService.getAllEvents(filters);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// Get single event
const getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Create event
const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Update event
const updateEvent = async (req, res, next) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Delete event
const deleteEvent = async (req, res, next) => {
  try {
    const result = await eventService.deleteEvent(req.params.id);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// Get categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await eventService.getCategories();
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// Get tags
const getTags = async (req, res, next) => {
  try {
    const tags = await eventService.getTags();
    res.json({ success: true, tags });
  } catch (error) {
    next(error);
  }
};

// Get upcoming events
const getUpcomingEvents = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const events = await eventService.getUpcomingEvents(limit);
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getCategories,
  getTags,
  getUpcomingEvents,
};
