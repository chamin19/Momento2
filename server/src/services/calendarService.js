const axios = require('axios');
const config = require('../config');

class CalendarService {
  constructor() {
    this.baseUrl = 'https://api.us.nylas.com/v3';
    this.apiKey = config.nylas.apiKey;
  }

  // Get authorization headers
  getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  // Get OAuth URL for user authentication
  getAuthUrl(redirectUri) {
    const params = new URLSearchParams({
      client_id: config.nylas.clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      access_type: 'offline',
    });

    return `https://api.us.nylas.com/v3/connect/auth?${params.toString()}`;
  }

  // Exchange authorization code for access token (Nylas v3)
  async exchangeCodeForToken(code, redirectUri) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/connect/token`,
        {
          client_id: config.nylas.clientId,
          code,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code_verifier: 'nylas', // Required for Nylas v3
        },
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error('Token exchange error:', error.message);
      throw new Error('Failed to exchange authorization code');
    }
  }

  // Create calendar event for user
  async createCalendarEvent(grantId, eventData) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/grants/${grantId}/events`,
        {
          title: eventData.title,
          description: eventData.description,
          when: {
            start_time: Math.floor(new Date(eventData.startTime).getTime() / 1000),
            end_time: Math.floor(new Date(eventData.endTime).getTime() / 1000),
          },
          location: eventData.location,
          reminders: {
            use_default: false,
            overrides: [
              { reminder_minutes: 60, reminder_method: 'email' },
              { reminder_minutes: 15, reminder_method: 'popup' },
            ],
          },
        },
        {
          headers: this.getHeaders(),
          params: { calendar_id: 'primary' },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Create calendar event error:', error.message);
      throw new Error('Failed to create calendar event');
    }
  }

  // Get user's calendars
  async getCalendars(grantId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/grants/${grantId}/calendars`,
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error('Get calendars error:', error.message);
      throw new Error('Failed to fetch calendars');
    }
  }

  // Delete calendar event
  async deleteCalendarEvent(grantId, eventId) {
    try {
      await axios.delete(
        `${this.baseUrl}/grants/${grantId}/events/${eventId}`,
        {
          headers: this.getHeaders(),
          params: { calendar_id: 'primary' },
        }
      );

      return { message: 'Event deleted successfully' };
    } catch (error) {
      console.error('Delete calendar event error:', error.message);
      throw new Error('Failed to delete calendar event');
    }
  }
}

module.exports = new CalendarService();
