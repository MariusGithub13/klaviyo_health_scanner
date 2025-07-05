import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSortControls = ({ onFilterChange, onSortChange, activeFilters, sortBy }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Tests', count: 7 },
    { id: 'critical', label: 'Critical Issues', count: 2 },
    { id: 'warning', label: 'Warnings', count: 3 },
    { id: 'passed', label: 'Passed', count: 2 },
    { id: 'failed', label: 'Failed', count: 5 }
  ];

  const sortOptions = [
    { id: 'severity', label: 'By Severity' },
    { id: 'name', label: 'By Test Name' },
    { id: 'status', label: 'By Status' }
  ];

  const handleFilterSelect = (filterId) => {
    onFilterChange(filterId);
    setIsFilterOpen(false);
  };

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsSortOpen(false);
  };

  return (
    <div className="px-content-padding py-4 bg-surface border-b border-border">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-text-primary">
          Diagnostic Results
        </h2>

        <div className="flex items-center space-x-2">
          {/* Filter Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              iconName="Filter"
              iconPosition="left"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-sm"
            >
              Filter
              {activeFilters !== 'all' && (
                <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  1
                </span>
              )}
            </Button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border 
                            rounded-lg shadow-modal z-50">
                <div className="p-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleFilterSelect(option.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm 
                                rounded-md transition-micro hover:bg-secondary-50
                                ${activeFilters === option.id ? 'bg-primary-50 text-primary' : 'text-text-primary'}`}
                    >
                      <span>{option.label}</span>
                      <span className="text-xs text-text-secondary">{option.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              iconName="ArrowUpDown"
              iconPosition="left"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="text-sm"
            >
              Sort
            </Button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-surface border border-border 
                            rounded-lg shadow-modal z-50">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortSelect(option.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md 
                                transition-micro hover:bg-secondary-50
                                ${sortBy === option.id ? 'bg-primary-50 text-primary' : 'text-text-primary'}`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.id && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilters !== 'all' && (
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Filtered by:</span>
          <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full border border-primary-200">
            {filterOptions.find(f => f.id === activeFilters)?.label}
            <button
              onClick={() => handleFilterSelect('all')}
              className="ml-1 hover:text-primary-700"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterSortControls;