const supabase = require('../config/supabase');

class EventService {
  // Get all events with optional filters
  async getAllEvents(filters = {}) {
    let query = supabase
      .from('events')
      .select('*, tags(*), locations(*)', { count: 'exact' });

    // Apply search filter
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Apply category filter
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    // Apply date range filter
    if (filters.startDate) {
      query = query.gte('event_date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('event_date', filters.endDate);
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'event_date';
    const sortOrder = filters.sortOrder || 'asc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    // Filter by city on the server side (after fetch)
    let filteredData = data;
    if (filters.city && data) {
      filteredData = data.filter(event => 
        event.locations?.city?.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Filter by tags on the server side (after fetch)
    if (filters.tags && filters.tags.length > 0 && filteredData) {
      filteredData = filteredData.filter(event => {
        if (!event.tags || event.tags.length === 0) return false;
        const eventTagNames = event.tags.map(t => t.name?.toLowerCase());
        return filters.tags.some(tag => eventTagNames.includes(tag.toLowerCase()));
      });
    }

    return {
      events: filteredData,
      pagination: {
        page,
        limit,
        total: count || filteredData?.length || 0,
        totalPages: Math.ceil((count || filteredData?.length || 0) / limit),
      },
    };
  }

  // Get single event by ID
  async getEventById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*, tags(*), locations(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new event
  async createEvent(eventData) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update event
  async updateEvent(id, eventData) {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete event
  async deleteEvent(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Event deleted successfully' };
  }

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('events')
      .select('category')
      .not('category', 'is', null);

    if (error) throw error;

    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
  }

  // Get all tags
  async getTags() {
    const { data, error } = await supabase
      .from('tags')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Get upcoming events
  async getUpcomingEvents(limit = 5) {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('events')
      .select('*, tags(*), locations(*)')
      .gte('event_date', today)
      .order('event_date', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Get events by location
  async getEventsByCity(city) {
    const { data, error } = await supabase
      .from('events')
      .select('*, tags(*), locations!inner(*)')
      .eq('locations.city', city);

    if (error) throw error;
    return data;
  }
}

module.exports = new EventService();
