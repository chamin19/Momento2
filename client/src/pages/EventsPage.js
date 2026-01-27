import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { EventList, SearchBar, EventFilters, Pagination } from '../components';

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    events, 
    loading, 
    error, 
    pagination, 
    filters, 
    categories, 
    tags,
    fetchEvents, 
    fetchCategories, 
    fetchTags,
    updateFilters, 
    clearFilters 
  } = useEvents();
  
  const isInitialized = useRef(false);

  // Initialize from URL params and fetch initial data
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    
    if (search || category || city) {
      updateFilters({
        search: search || '',
        category: category || '',
        city: city || '',
      });
    }
    
    fetchCategories();
    fetchTags();
    isInitialized.current = true;
  }, []);

  // Fetch events when filters change (after initialization)
  useEffect(() => {
    if (isInitialized.current) {
      fetchEvents(1);
    }
  }, [filters]);

  // Initial fetch
  useEffect(() => {
    fetchEvents(1);
  }, []);

  const handleSearch = (query) => {
    updateFilters({ search: query });
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    fetchEvents(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Events</h1>
          <p className="text-gray-600 mt-2">
            Discover free tech events across the Greater Toronto Area
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search events by name, topic, or description..."
          />
        </div>

        {/* Filters */}
        <EventFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          categories={categories}
          tags={tags}
        />

        {/* Results Count */}
        {!loading && events.length > 0 && (
          <p className="text-gray-600 mb-4">
            Showing {events.length} of {pagination.total} events
          </p>
        )}

        {/* Event List */}
        <EventList events={events} loading={loading} error={error} />

        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EventsPage;
