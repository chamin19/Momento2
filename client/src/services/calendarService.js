import api from './api';

export const calendarService = {
  // Get OAuth URL for calendar connection
  getAuthUrl: async () => {
    const response = await api.get('/calendar/auth');
    return response.data;
  },

  // Exchange code for token
  exchangeCode: async (code) => {
    const response = await api.get(`/calendar/callback?code=${code}`);
    return response.data;
  },

  // Add event to calendar
  addToCalendar: async (grantId, eventData) => {
    const response = await api.post('/calendar/events', { grantId, eventData });
    return response.data;
  },

  // Get user calendars
  getCalendars: async (grantId) => {
    const response = await api.get(`/calendar/${grantId}/calendars`);
    return response.data;
  },

  // Remove event from calendar
  removeFromCalendar: async (grantId, eventId) => {
    const response = await api.delete(`/calendar/${grantId}/events/${eventId}`);
    return response.data;
  },
};

export default calendarService;
