import { useState, useCallback } from 'react';
import { geocodingService } from '../services';

export const useGeocoding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const geocodeAddress = useCallback(async (address) => {
    setLoading(true);
    setError(null);
    try {
      const result = await geocodingService.geocodeAddress(address);
      return result.location;
    } catch (err) {
      setError(err.message || 'Failed to geocode address');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const geocodeEventLocation = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      const result = await geocodingService.geocodeEventLocation(location);
      return result.location;
    } catch (err) {
      setError(err.message || 'Failed to geocode location');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    geocodeAddress,
    geocodeEventLocation,
  };
};

export default useGeocoding;
