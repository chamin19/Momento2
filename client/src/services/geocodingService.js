import api from './api';

export const geocodingService = {
  // Geocode an address
  geocodeAddress: async (address) => {
    const response = await api.get(`/geocode?address=${encodeURIComponent(address)}`);
    return response.data;
  },

  // Reverse geocode coordinates
  reverseGeocode: async (lat, lng) => {
    const response = await api.get(`/geocode/reverse?lat=${lat}&lng=${lng}`);
    return response.data;
  },

  // Geocode event location (GTA-specific)
  geocodeEventLocation: async (location) => {
    const response = await api.get(`/geocode/event?location=${encodeURIComponent(location)}`);
    return response.data;
  },
};

export default geocodingService;
