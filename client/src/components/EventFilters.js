import React, { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const EventFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  categories = [], 
  tags = [],
  cities = ['Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill', 'Scarborough', 'North York']
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const handleTagToggle = (tagName) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tagName)
      ? currentTags.filter(t => t !== tagName)
      : [...currentTags, tagName];
    onFilterChange({ tags: newTags });
  };

  const hasActiveFilters = () => {
    return filters.category || filters.city || filters.startDate || 
           filters.endDate || (filters.tags && filters.tags.length > 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between py-2"
      >
        <span className="flex items-center text-gray-700 font-medium">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filters
          {hasActiveFilters() && (
            <span className="ml-2 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </span>
      </button>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-0">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              value={filters.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id || tag.name}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    (filters.tags || []).includes(tag.name)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters() && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClearFilters}
              className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilters;
