const { calendarService } = require('../services');
const config = require('../config');

// Get OAuth URL for calendar connection
const getAuthUrl = async (req, res, next) => {
  try {
    const redirectUri = `${config.clientUrl}/calendar/callback`;
    const authUrl = calendarService.getAuthUrl(redirectUri);
    res.json({ success: true, authUrl });
  } catch (error) {
    next(error);
  }
};

// Handle OAuth callback
const handleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ success: false, error: 'Authorization code is required' });
    }

    const redirectUri = `${config.clientUrl}/calendar/callback`;
    const tokenData = await calendarService.exchangeCodeForToken(code, redirectUri);
    
    res.json({ success: true, ...tokenData });
  } catch (error) {
    next(error);
  }
};

// Add event to calendar
const addToCalendar = async (req, res, next) => {
  try {
    const { grantId, eventData } = req.body;
    
    if (!grantId || !eventData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Grant ID and event data are required' 
      });
    }

    const calendarEvent = await calendarService.createCalendarEvent(grantId, eventData);
    res.json({ success: true, calendarEvent });
  } catch (error) {
    next(error);
  }
};

// Get user calendars
const getCalendars = async (req, res, next) => {
  try {
    const { grantId } = req.params;
    
    if (!grantId) {
      return res.status(400).json({ success: false, error: 'Grant ID is required' });
    }

    const calendars = await calendarService.getCalendars(grantId);
    res.json({ success: true, calendars });
  } catch (error) {
    next(error);
  }
};

// Remove event from calendar
const removeFromCalendar = async (req, res, next) => {
  try {
    const { grantId, eventId } = req.params;
    
    if (!grantId || !eventId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Grant ID and event ID are required' 
      });
    }

    const result = await calendarService.deleteCalendarEvent(grantId, eventId);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
  addToCalendar,
  getCalendars,
  removeFromCalendar,
};
