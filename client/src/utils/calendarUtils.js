// Generate .ics calendar file content
export const generateICSFile = (event) => {
  const formatDate = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    if (timeStr) {
      const [hours, minutes] = timeStr.split(':');
      date.setHours(parseInt(hours), parseInt(minutes), 0);
    }
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const startDate = formatDate(event.event_date, event.start_time);
  const endDate = formatDate(event.event_date, event.end_time || event.start_time);
  
  const location = event.locations?.address 
    ? `${event.locations.address}, ${event.locations.city}, ${event.locations.province}`
    : event.locations?.city || 'TBD';

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GTA Tech Events//EN
BEGIN:VEVENT
UID:${event.id}@gtatechevents.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.description?.replace(/\n/g, '\\n') || ''}
LOCATION:${location}
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: ${event.title}
TRIGGER:-PT1H
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: ${event.title} starts in 15 minutes
TRIGGER:-PT15M
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
};

// Download .ics file
export const downloadICSFile = (event) => {
  const icsContent = generateICSFile(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate Google Calendar URL (no API needed!)
export const generateGoogleCalendarUrl = (event) => {
  const formatGoogleDate = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    if (timeStr) {
      const [hours, minutes] = timeStr.split(':');
      date.setHours(parseInt(hours), parseInt(minutes), 0);
    }
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '').slice(0, -1);
  };

  const startDate = formatGoogleDate(event.event_date, event.start_time);
  const endDate = formatGoogleDate(event.event_date, event.end_time || event.start_time);
  
  const location = event.locations?.address 
    ? `${event.locations.address}, ${event.locations.city}, ${event.locations.province}`
    : event.locations?.city || '';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.description || '',
    location: location,
    ctz: 'America/Toronto',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Generate Outlook Calendar URL
export const generateOutlookCalendarUrl = (event) => {
  const location = event.locations?.address 
    ? `${event.locations.address}, ${event.locations.city}, ${event.locations.province}`
    : event.locations?.city || '';

  const startDate = new Date(`${event.event_date}T${event.start_time || '09:00'}`);
  const endDate = new Date(`${event.event_date}T${event.end_time || '17:00'}`);

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    body: event.description || '',
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    location: location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};
