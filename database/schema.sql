-- GTA Tech Events Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(50) DEFAULT 'Ontario',
    postal_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'Canada',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    category VARCHAR(100),
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    image_url TEXT,
    external_url TEXT,
    is_free BOOLEAN DEFAULT true,
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event tags junction table
CREATE TABLE IF NOT EXISTS event_tags (
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, tag_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_is_free ON events(is_free);
CREATE INDEX IF NOT EXISTS idx_locations_city ON locations(city);

-- Create a view that joins events with their locations and tags
CREATE OR REPLACE VIEW events_with_details AS
SELECT 
    e.*,
    json_build_object(
        'id', l.id,
        'address', l.address,
        'city', l.city,
        'province', l.province,
        'latitude', l.latitude,
        'longitude', l.longitude
    ) AS locations,
    COALESCE(
        (SELECT json_agg(json_build_object('id', t.id, 'name', t.name))
         FROM event_tags et
         JOIN tags t ON et.tag_id = t.id
         WHERE et.event_id = e.id),
        '[]'::json
    ) AS tags
FROM events e
LEFT JOIN locations l ON e.location_id = l.id;

-- Insert sample tags
INSERT INTO tags (name) VALUES
    ('JavaScript'),
    ('Python'),
    ('React'),
    ('Node.js'),
    ('Machine Learning'),
    ('Data Science'),
    ('Cloud Computing'),
    ('DevOps'),
    ('Networking'),
    ('Career Development'),
    ('Startup'),
    ('AI'),
    ('Web Development'),
    ('Mobile Development'),
    ('Cybersecurity'),
    ('UX/UI Design'),
    ('Blockchain'),
    ('Open Source')
ON CONFLICT (name) DO NOTHING;

-- Insert sample locations
INSERT INTO locations (address, city, latitude, longitude) VALUES
    ('100 Queen St W', 'Toronto', 43.6532, -79.3832),
    ('4700 Keele St', 'Toronto', 43.7735, -79.5019),
    ('1265 Military Trail', 'Scarborough', 43.7845, -79.1873),
    ('3359 Mississauga Rd', 'Mississauga', 43.5489, -79.6628),
    ('4000 Victoria Park Ave', 'North York', 43.7773, -79.3403),
    ('350 Victoria St', 'Toronto', 43.6579, -79.3789),
    ('111 Richmond St W', 'Toronto', 43.6510, -79.3828)
ON CONFLICT DO NOTHING;

-- Insert sample events
INSERT INTO events (title, description, event_date, start_time, end_time, category, location_id, is_free, source) VALUES
    (
        'Toronto JavaScript Meetup',
        'Join us for an evening of JavaScript talks and networking. Topics include React 19, Next.js 15, and the latest in web development.',
        '2026-01-15',
        '18:30',
        '21:00',
        'Meetup',
        (SELECT id FROM locations WHERE city = 'Toronto' LIMIT 1),
        true,
        'meetup.com'
    ),
    (
        'Python for Data Science Workshop',
        'A hands-on workshop covering pandas, numpy, and matplotlib for data analysis. Suitable for beginners.',
        '2026-01-20',
        '10:00',
        '16:00',
        'Workshop',
        (SELECT id FROM locations WHERE city = 'Toronto' LIMIT 1 OFFSET 1),
        true,
        'eventbrite.com'
    ),
    (
        'GTA Tech Networking Night',
        'Monthly networking event for tech professionals in the Greater Toronto Area. Meet recruiters, founders, and fellow developers.',
        '2026-01-25',
        '19:00',
        '22:00',
        'Networking',
        (SELECT id FROM locations WHERE city = 'Toronto' LIMIT 1),
        true,
        'lu.ma'
    ),
    (
        'Cloud Computing Fundamentals',
        'Introduction to AWS, Azure, and GCP. Learn about cloud architecture, deployment, and best practices.',
        '2026-02-01',
        '09:00',
        '17:00',
        'Workshop',
        (SELECT id FROM locations WHERE city = 'Mississauga' LIMIT 1),
        true,
        'eventbrite.com'
    ),
    (
        'AI/ML Study Group',
        'Weekly study group for machine learning enthusiasts. This week: Neural Networks and Deep Learning.',
        '2026-02-05',
        '18:00',
        '20:00',
        'Study Group',
        (SELECT id FROM locations WHERE city = 'North York' LIMIT 1),
        true,
        'meetup.com'
    ),
    (
        'Startup Pitch Night',
        'Watch 10 early-stage startups pitch their ideas to a panel of investors. Great networking opportunity.',
        '2026-02-10',
        '18:30',
        '21:30',
        'Startup',
        (SELECT id FROM locations WHERE city = 'Toronto' LIMIT 1 OFFSET 2),
        true,
        'lu.ma'
    )
ON CONFLICT DO NOTHING;

-- Link events to tags
INSERT INTO event_tags (event_id, tag_id)
SELECT e.id, t.id
FROM events e, tags t
WHERE e.title = 'Toronto JavaScript Meetup' 
AND t.name IN ('JavaScript', 'React', 'Web Development', 'Node.js')
ON CONFLICT DO NOTHING;

INSERT INTO event_tags (event_id, tag_id)
SELECT e.id, t.id
FROM events e, tags t
WHERE e.title = 'Python for Data Science Workshop' 
AND t.name IN ('Python', 'Data Science', 'Machine Learning')
ON CONFLICT DO NOTHING;

INSERT INTO event_tags (event_id, tag_id)
SELECT e.id, t.id
FROM events e, tags t
WHERE e.title = 'GTA Tech Networking Night' 
AND t.name IN ('Networking', 'Career Development')
ON CONFLICT DO NOTHING;

INSERT INTO event_tags (event_id, tag_id)
SELECT e.id, t.id
FROM events e, tags t
WHERE e.title = 'Cloud Computing Fundamentals' 
AND t.name IN ('Cloud Computing', 'DevOps')
ON CONFLICT DO NOTHING;

INSERT INTO event_tags (event_id, tag_id)
SELECT e.id, t.id
FROM events e, tags t
WHERE e.title = 'AI/ML Study Group' 
AND t.name IN ('Machine Learning', 'AI', 'Python')
ON CONFLICT DO NOTHING;

INSERT INTO event_tags (event_id, tag_id)
SELECT e.id, t.id
FROM events e, tags t
WHERE e.title = 'Startup Pitch Night' 
AND t.name IN ('Startup', 'Networking', 'Career Development')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access for locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read access for tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read access for event_tags" ON event_tags FOR SELECT USING (true);
