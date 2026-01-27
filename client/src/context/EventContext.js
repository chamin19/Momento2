import React, { createContext, useContext, useState, useCallback } from 'react';
import { eventService } from '../services';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    city: '',
    tags: [],
    startDate: '',
    endDate: '',
    sortBy: 'event_date',
    sortOrder: 'asc',
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Fetch events with current filters
  const fetchEvents = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await eventService.getEvents({
        ...filters,
        page,
        limit: pagination.limit,
      });
      setEvents(result.events || []);
      setPagination(result.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit]);

  // Fetch single event
  const fetchEventById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await eventService.getEventById(id);
      setCurrentEvent(result.event);
      return result.event;
    } catch (err) {
      setError(err.message || 'Failed to fetch event');
      setCurrentEvent(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const result = await eventService.getCategories();
      setCategories(result.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // Fetch tags
  const fetchTags = useCallback(async () => {
    try {
      const result = await eventService.getTags();
      setTags(result.tags || []);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      city: '',
      tags: [],
      startDate: '',
      endDate: '',
      sortBy: 'event_date',
      sortOrder: 'asc',
    });
  }, []);

  const value = {
    events,
    currentEvent,
    loading,
    error,
    pagination,
    filters,
    categories,
    tags,
    fetchEvents,
    fetchEventById,
    fetchCategories,
    fetchTags,
    updateFilters,
    clearFilters,
    setCurrentEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
