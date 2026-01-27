const { geocodingService } = require('../services');

// Geocode address
const geocodeAddress = async (req, res, next) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ success: false, error: 'Address is required' });
    }

    const result = await geocodingService.geocodeAddress(address);
    
    if (!result) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }

    res.json({ success: true, location: result });
  } catch (error) {
    next(error);
  }
};

// Reverse geocode
const reverseGeocode = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ success: false, error: 'Latitude and longitude are required' });
    }

    const result = await geocodingService.reverseGeocode(parseFloat(lat), parseFloat(lng));
    
    if (!result) {
      return res.status(404).json({ success: false, error: 'Address not found' });
    }

    res.json({ success: true, address: result });
  } catch (error) {
    next(error);
  }
};

// Geocode event location (GTA-specific)
const geocodeEventLocation = async (req, res, next) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ success: false, error: 'Location is required' });
    }

    const result = await geocodingService.geocodeEventLocation(location);
    
    if (!result) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }

    res.json({ success: true, location: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  geocodeAddress,
  reverseGeocode,
  geocodeEventLocation,
};
