import { useState, useEffect, useCallback } from 'react';
import { eventService } from '../services';

export const useEvents = (initialFilters = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

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
      setPagination(result.pagination || { page, limit: 10, total: 0, totalPages: 0 });
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const goToPage = useCallback((page) => {
    fetchEvents(page);
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    goToPage,
    refetch: fetchEvents,
  };
};

export default useEvents;
