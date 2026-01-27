import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { EventList, SearchBar } from '../components';
import { CalendarIcon, MapPinIcon, MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const { events, loading, error, fetchEvents } = useEvents();

  useEffect(() => {
    fetchEvents(1);
  }, [fetchEvents]);

  const handleSearch = (query) => {
    // Redirect to events page with search query
    if (query) {
      window.location.href = `/events?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Free Tech Events in the GTA
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Find workshops, meetups, hackathons, and networking events to accelerate 
              your tech career in the Greater Toronto Area.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search events, topics, or locations..."
              />
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-primary-200 text-sm">Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-primary-200 text-sm">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold">FREE</div>
                <div className="text-primary-200 text-sm">Always</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why GTA Tech Events?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We aggregate free tech events from across the Greater Toronto Area to make 
              your professional development more accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Discovery</h3>
              <p className="text-gray-600">
                Search and filter events by category, location, date, and tags to find 
                exactly what you're looking for.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location Mapping</h3>
              <p className="text-gray-600">
                See events on an interactive map to find opportunities near you across 
                the GTA.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar Sync</h3>
              <p className="text-gray-600">
                Add events directly to your calendar with automatic reminders so you 
                never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
              <p className="text-gray-600 mt-2">Don't miss these upcoming opportunities</p>
            </div>
            <Link
              to="/events"
              className="hidden md:inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Events
            </Link>
          </div>

          <EventList events={events.slice(0, 6)} loading={loading} error={error} />

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SparklesIcon className="h-12 w-12 text-primary-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Career?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Start exploring free tech events in the Greater Toronto Area today. 
            Connect your calendar to stay organized and never miss an event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Events
            </Link>
            <Link
              to="/map"
              className="px-8 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              View Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
