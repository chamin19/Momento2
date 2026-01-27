import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useCalendar } from '../context/CalendarContext';
import { Loading } from '../components';
import { formatDate, formatTime } from '../utils';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  LinkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const EventDetailPage = () => {
  const { id } = useParams();
  const { currentEvent, loading, error, fetchEventById } = useEvents();
  const { isConnected, addEventToCalendar, connectCalendar } = useCalendar();
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchEventById(id);
  }, [id, fetchEventById]);

  const handleAddToCalendar = async () => {
    if (!isConnected) {
      connectCalendar();
      return;
    }

    setAdding(true);
    try {
      const eventData = {
        title: currentEvent.title,
        description: currentEvent.description,
        location: currentEvent.locations?.address || currentEvent.locations?.city,
        startTime: `${currentEvent.event_date}T${currentEvent.start_time || '09:00'}`,
        endTime: `${currentEvent.event_date}T${currentEvent.end_time || '17:00'}`,
      };
      
      const result = await addEventToCalendar(eventData);
      if (result) {
        setAddedToCalendar(true);
      }
    } catch (err) {
      console.error('Failed to add to calendar:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentEvent.title,
          text: currentEvent.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <Loading text="Loading event details..." />;
  }

  if (error || !currentEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The event you\'re looking for doesn\'t exist.'}</p>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Events
        </Link>

        {/* Event Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Event Header Image */}
          <div className="h-64 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
            {currentEvent.image_url ? (
              <img
                src={currentEvent.image_url}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CalendarIcon className="h-24 w-24 text-white/50" />
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {currentEvent.is_free && (
                <span className="bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  FREE
                </span>
              )}
              {currentEvent.category && (
                <span className="bg-white/90 text-gray-800 text-sm font-medium px-4 py-1 rounded-full">
                  {currentEvent.category}
                </span>
              )}
            </div>
          </div>

          {/* Event Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {currentEvent.title}
            </h1>

            {/* Event Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Date */}
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-3 text-primary-500" />
                <span>{formatDate(currentEvent.event_date)}</span>
              </div>

              {/* Time */}
              {(currentEvent.start_time || currentEvent.end_time) && (
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-3 text-primary-500" />
                  <span>
                    {currentEvent.start_time && currentEvent.start_time}
                    {currentEvent.end_time && ` - ${currentEvent.end_time}`}
                  </span>
                </div>
              )}

              {/* Location */}
              {currentEvent.locations && (
                <div className="flex items-center text-gray-600 md:col-span-2">
                  <MapPinIcon className="h-5 w-5 mr-3 text-primary-500" />
                  <span>{currentEvent.locations.address || currentEvent.locations.city}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {currentEvent.tags && currentEvent.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {currentEvent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      <TagIcon className="h-4 w-4 mr-1" />
                      {tag.name || tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{currentEvent.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Add to Calendar */}
              <button
                onClick={handleAddToCalendar}
                disabled={adding || addedToCalendar}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  addedToCalendar
                    ? 'bg-green-100 text-green-700'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {addedToCalendar ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Added to Calendar
                  </>
                ) : adding ? (
                  'Adding...'
                ) : (
                  <>
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {isConnected ? 'Add to Calendar' : 'Connect Calendar'}
                  </>
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share Event
              </button>

              {/* External Link */}
              {currentEvent.external_url && (
                <a
                  href={currentEvent.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <LinkIcon className="h-5 w-5 mr-2" />
                  View Original
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
