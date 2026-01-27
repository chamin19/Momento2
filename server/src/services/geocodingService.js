const axios = require('axios');
const config = require('../config');

class GeocodingService {
  constructor() {
    this.baseUrl = 'https://api.opencagedata.com/geocode/v1/json';
    this.apiKey = config.openCage.apiKey;
  }

  // Forward geocoding: Address to coordinates
  async geocodeAddress(address) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: address,
          key: this.apiKey,
          limit: 1,
          no_annotations: 1,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
          formattedAddress: result.formatted,
          components: result.components,
        };
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error.message);
      throw new Error('Failed to geocode address');
    }
  }

  // Reverse geocoding: Coordinates to address
  async reverseGeocode(latitude, longitude) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: `${latitude}+${longitude}`,
          key: this.apiKey,
          limit: 1,
          no_annotations: 1,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          formattedAddress: result.formatted,
          components: result.components,
          city: result.components.city || result.components.town || result.components.village,
          province: result.components.state,
          country: result.components.country,
        };
      }

      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error.message);
      throw new Error('Failed to reverse geocode coordinates');
    }
  }

  // Geocode event location and return full location data
  async geocodeEventLocation(locationString) {
    // Append GTA context for better results
    const gtaLocation = `${locationString}, Greater Toronto Area, Ontario, Canada`;
    return this.geocodeAddress(gtaLocation);
  }
}

module.exports = new GeocodingService();
