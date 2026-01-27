// Truncate text to specified length
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Capitalize first letter of each word
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Generate slug from text
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Pluralize word based on count
export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural || `${singular}s`;
};
