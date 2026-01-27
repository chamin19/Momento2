import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCalendar } from '../context/CalendarContext';
import { Loading } from '../components';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const CalendarCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback, loading, error } = useCalendar();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      handleCallback(code).then((result) => {
        if (result) {
          // Redirect to home page after successful connection
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      });
    }
  }, [searchParams, handleCallback, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loading text="Connecting your calendar..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Calendar Connected!</h2>
        <p className="text-gray-600 mb-6">
          Your calendar has been successfully connected. You can now add events with reminders.
        </p>
        <p className="text-sm text-gray-400">Redirecting you to the home page...</p>
      </div>
    </div>
  );
};

export default CalendarCallback;
