import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { formatDate, getRelativeTime, truncateText } from '../utils';

const EventCard = ({ event }) => {
  const {
    id,
    title,
    description,
    event_date,
    start_time,
    end_time,
    category,
    locations,
    tags,
    image_url,
    is_free,
  } = event;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CalendarIcon className="h-16 w-16 text-white/50" />
          </div>
        )}
        
        {/* Free Badge */}
        {is_free && (
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            FREE
          </span>
        )}
        
        {/* Category Badge */}
        {category && (
          <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Event Content */}
      <div className="p-5">
        <Link to={`/events/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-2">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4">
          {truncateText(description, 120)}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2 text-primary-500" />
            <span>{formatDate(event_date)}</span>
            <span className="ml-2 text-primary-600 font-medium">
              ({getRelativeTime(event_date)})
            </span>
          </div>

          {/* Time */}
          {(start_time || end_time) && (
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-2 text-primary-500" />
              <span>
                {start_time && start_time}
                {end_time && ` - ${end_time}`}
              </span>
            </div>
          )}

          {/* Location */}
          {locations && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-2 text-primary-500" />
              <span>{locations.address || locations.city}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                <TagIcon className="h-3 w-3 mr-1" />
                {tag.name || tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-400">+{tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* View Details Button */}
        <Link
          to={`/events/${id}`}
          className="mt-4 block w-full text-center py-2 bg-primary-50 text-primary-600 font-medium rounded-lg hover:bg-primary-100 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
