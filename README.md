# GTA Tech Events Aggregator

A full-stack web application that aggregates free tech events and programs in the Greater Toronto Area (GTA) from public sources to make career growth more accessible.

## 🚀 Features

- **Event Discovery**: Browse, search, and filter tech events across the GTA
- **Single-Page Architecture**: Smooth client-side routing for seamless navigation
- **Interactive Map**: View events on an interactive map powered by OpenCage geocoding
- **Calendar Export**: Add events to Google Calendar, Outlook, or download .ics files
- **Responsive Design**: Beautiful UI with Tailwind CSS that works on all devices
- **Smart Filtering**: Filter by category, location, date, and tags

## 🛠 Tech Stack

- **Frontend**: React 18 with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL via Supabase
- **HTTP Client**: Axios
- **APIs**: 
  - OpenCage (geocoding/location mapping)
- **Maps**: React Leaflet with OpenStreetMap
- **Calendar**: .ics file generation, Google Calendar & Outlook links

## 📁 Project Structure

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
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)
- OpenCage API key (for geocoding)

### Environment Setup

#### Backend (`server/.env`)

```bash
# Copy the example file
cp server/.env.example server/.env

# Fill in your values:
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENCAGE_API_KEY=your_opencage_api_key
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### Frontend (`client/.env`)

```bash
# Copy the example file
cp client/.env.example client/.env

# Fill in your values:
REACT_APP_API_URL=http://localhost:5001/api
```

### Database Setup (Supabase)

1. Create a new project in [Supabase](https://supabase.com)
2. Run the SQL schema from `database/schema.sql` in the Supabase SQL Editor
3. Copy your project URL and anon key to the `.env` file

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

```bash
# Start the backend server (from server directory)
cd server
npm run dev

# Start the frontend (from client directory, in a new terminal)
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api

## 📚 API Endpoints

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get single event
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/categories` - Get all categories
- `GET /api/events/tags` - Get all tags

### Geocoding
- `GET /api/geocode?address=` - Geocode an address
- `GET /api/geocode/reverse?lat=&lng=` - Reverse geocode
- `GET /api/geocode/event?location=` - Geocode event location (GTA-specific)

## 🎨 Key Components

- **EventCard**: Displays event information in a card format
- **EventList**: Grid layout of EventCards with loading states
- **SearchBar**: Search input for filtering events
- **EventFilters**: Category, location, date, and tag filters
- **EventMap**: Interactive map showing event locations
- **Pagination**: Navigate through paginated results

## 🔧 Configuration

### Tailwind CSS

Custom colors and fonts are configured in `client/tailwind.config.js`:
- Primary color scheme (blue)
- Secondary color scheme (green)
- Inter font family

### API Configuration

API base URL and settings are in `client/src/services/api.js`

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
