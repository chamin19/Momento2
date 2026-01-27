import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const EventMap = ({ events = [], center = [43.6532, -79.3832], zoom = 11 }) => {
  const [eventsWithCoords, setEventsWithCoords] = useState([]);

  useEffect(() => {
    // Filter events that have valid coordinates
    const validEvents = events.filter(
      event => event.locations?.latitude && event.locations?.longitude
    );
    setEventsWithCoords(validEvents);
  }, [events]);

  return (
    <div className="h-[500px] rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {eventsWithCoords.map((event) => (
          <Marker
            key={event.id}
            position={[event.locations.latitude, event.locations.longitude]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {event.locations.address || event.locations.city}
                </p>
                <Link
                  to={`/events/${event.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventMap;
