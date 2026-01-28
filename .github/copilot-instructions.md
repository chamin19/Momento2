# GTA Tech Events Aggregator

## Project Overview
A full-stack web application that aggregates free tech events and programs in the Greater Toronto Area (GTA) from public sources to make career growth more accessible.

## Tech Stack
- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL via Supabase
- **HTTP Client**: Axios
- **APIs**: OpenCage (location mapping)
- **Calendar**: .ics file generation, Google Calendar & Outlook URL links

## Project Structure
```
/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── context/        # React context providers
│   │   └── utils/          # Utility functions
│   └── public/
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Configuration files
│   └── package.json
└── README.md
```

## Key Features
- Single-page architecture with client-side routing (React Router)
- Event discovery with search, filtering, and tagging
- OpenCage API integration for event location mapping
- Calendar export via .ics files and direct links to Google Calendar/Outlook

## Environment Variables Required
### Backend (.env)
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `OPENCAGE_API_KEY` - OpenCage geocoding API key
- `PORT` - Server port (default: 5001)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

## Development Commands
- `cd client && npm start` - Start React development server
- `cd server && npm run dev` - Start Node.js development server
- `cd client && npm run build` - Build React for production
