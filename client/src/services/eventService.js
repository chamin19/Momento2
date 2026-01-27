import api from './api';

export const eventService = {
  // Get all events with filters
  getEvents: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.city) params.append('city', filters.city);
    if (filters.tags) params.append('tags', filters.tags.join(','));
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/events?${params.toString()}`);
    return response.data;
  },

  // Get single event
  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Get upcoming events
  getUpcomingEvents: async (limit = 5) => {
    const response = await api.get(`/events/upcoming?limit=${limit}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/events/categories');
    return response.data;
  },

  // Get tags
  getTags: async () => {
    const response = await api.get('/events/tags');
    return response.data;
  },
};

export default eventService;
