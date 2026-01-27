import React, { useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { EventMap, Loading } from '../components';

const MapPage = () => {
  const { events, loading, error, fetchEvents } = useEvents();

  useEffect(() => {
    // Fetch all events for the map
    fetchEvents(1);
  }, [fetchEvents]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Event Map</h1>
          <p className="text-gray-600 mt-2">
            Explore tech events across the Greater Toronto Area
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading text="Loading map..." />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <EventMap events={events} />
            
            {/* Legend / Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{events.length} events</span> shown on the map. 
                Click on markers to see event details.
              </p>
            </div>
          </div>
        )}

        {/* Events List Below Map */}
        {!loading && events.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Events by Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.filter(e => e.locations).slice(0, 9).map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {event.locations?.city || 'GTA'}
                  </p>
                  <a 
                    href={`/events/${event.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
