import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { CalendarProvider } from './context/CalendarContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MapPage from './pages/MapPage';
import CalendarCallback from './pages/CalendarCallback';

function App() {
  return (
    <Router>
      <EventProvider>
        <CalendarProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/calendar/callback" element={<CalendarCallback />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CalendarProvider>
      </EventProvider>
    </Router>
  );
}

export default App;
