-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Locations table (Remains largely the same)
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

-- 3. Tags table (Niche focus groups added)
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Events table (Updated with Scraper Safety Nets)
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    category VARCHAR(100), -- e.g., 'Workshop', 'Panel'
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    is_virtual BOOLEAN DEFAULT false, -- New: For webinars
    image_url TEXT,
    external_url TEXT NOT NULL, 
    is_free BOOLEAN DEFAULT true,
    source VARCHAR(100), -- e.g., 'Amazon Careers', 'UofT Newsletter'
    raw_data JSONB, -- New: Stores the scraped HTML/JSON snippet for debugging
    last_scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- New: Tracking freshness
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- SAFETY: Prevent duplicate events by making the URL unique
    CONSTRAINT unique_event_url UNIQUE (external_url)
);

-- 5. Event tags junction table
CREATE TABLE IF NOT EXISTS event_tags (
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, tag_id)
);

-- 6. Indexes for Scraper Performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_external_url ON events(external_url);
CREATE INDEX IF NOT EXISTS idx_events_is_virtual ON events(is_virtual);

---
--- SEED DATA: Niche Focus Groups & Starter Tags
---

INSERT INTO tags (name) VALUES
    -- Focus Groups
    ('Indigenous-led'), ('Black in Tech'), ('Women in Tech'), 
    ('LGBTQ2S+'), ('Accessible/Disabled'), ('Neurodiversity'),
    ('POC'), ('Newcomers'),
    -- Technical Categories
    ('Software Engineering'), ('Data Science'), ('UX/UI Design'),
    ('Product Management'), ('Cloud Computing'), ('AI/ML'),
    -- Event Types
    ('Webinar'), ('Seminar'), ('Networking'), ('Workshop'), 
    ('Panel'), ('Mixer'), ('Job Fair'), ('Recruitment')
ON CONFLICT (name) DO NOTHING;

-- 7. View for Easy Access
CREATE OR REPLACE VIEW events_with_details AS
SELECT 
    e.*,
    l.city as location_city,
    l.address as location_address,
    COALESCE(
        (SELECT json_agg(t.name)
         FROM event_tags et
         JOIN tags t ON et.tag_id = t.id
         WHERE et.event_id = e.id),
        '[]'::json
    ) AS tag_names
FROM events e
LEFT JOIN locations l ON e.location_id = l.id;