require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    databaseUrl: process.env.DATABASE_URL,
  },
  openCage: {
    apiKey: process.env.OPENCAGE_API_KEY,
  },
};
