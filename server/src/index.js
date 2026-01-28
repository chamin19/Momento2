const express = require('express');
const config = require('./config');
const { corsMiddleware, errorHandler } = require('./middleware');
const { eventRoutes, geocodingRoutes } = require('./routes');

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/geocode', geocodingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
});

module.exports = app;
