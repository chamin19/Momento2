import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { calendarService } from '../services';

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const CalendarProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [grantId, setGrantId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for stored connection on mount
  useEffect(() => {
    const storedGrantId = localStorage.getItem('calendar_grant_id');
    if (storedGrantId) {
      setGrantId(storedGrantId);
      setIsConnected(true);
    }
  }, []);

  // Connect to calendar
  const connectCalendar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await calendarService.getAuthUrl();
      // Redirect to OAuth URL
      window.location.href = result.authUrl;
    } catch (err) {
      setError(err.message || 'Failed to connect calendar');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle OAuth callback
  const handleCallback = useCallback(async (code) => {
    setLoading(true);
    setError(null);
    try {
      const result = await calendarService.exchangeCode(code);
      if (result.grant_id) {
        setGrantId(result.grant_id);
        setIsConnected(true);
        localStorage.setItem('calendar_grant_id', result.grant_id);
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to complete calendar connection');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add event to calendar
  const addEventToCalendar = useCallback(async (eventData) => {
    if (!grantId) {
      setError('Calendar not connected');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await calendarService.addToCalendar(grantId, eventData);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to add event to calendar');
      return null;
    } finally {
      setLoading(false);
    }
  }, [grantId]);

  // Disconnect calendar
  const disconnectCalendar = useCallback(() => {
    setGrantId(null);
    setIsConnected(false);
    localStorage.removeItem('calendar_grant_id');
  }, []);

  const value = {
    isConnected,
    grantId,
    loading,
    error,
    connectCalendar,
    handleCallback,
    addEventToCalendar,
    disconnectCalendar,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContext;
