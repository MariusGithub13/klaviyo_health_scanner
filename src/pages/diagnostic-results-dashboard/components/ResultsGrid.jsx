import React, { useState } from 'react';
import DiagnosticResultCard from './DiagnosticResultCard';
import Icon from '../../../components/AppIcon';


const ResultsGrid = ({ tests, activeFilter, sortBy }) => {
  const [expandedCards, setExpandedCards] = useState(new Set());

  const handleToggleExpand = (testId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId);
    } else {
      newExpanded.add(testId);
    }
    setExpandedCards(newExpanded);
  };

  const filterTests = (tests, filter) => {
    switch (filter) {
      case 'critical':
        return tests.filter(test => test.severity === 'critical');
      case 'warning':
        return tests.filter(test => test.severity === 'warning');
      case 'passed':
        return tests.filter(test => test.status === 'passed');
      case 'failed':
        return tests.filter(test => test.status === 'failed');
      default:
        return tests;
    }
  };

  const sortTests = (tests, sortBy) => {
    const sortedTests = [...tests];
    switch (sortBy) {
      case 'severity':
        return sortedTests.sort((a, b) => {
          const severityOrder = { critical: 0, warning: 1, info: 2 };
          return (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3);
        });
      case 'name':
        return sortedTests.sort((a, b) => a.name.localeCompare(b.name));
      case 'status':
        return sortedTests.sort((a, b) => {
          const statusOrder = { failed: 0, warning: 1, passed: 2 };
          return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
        });
      default:
        return sortedTests;
    }
  };

  const filteredTests = filterTests(tests, activeFilter);
  const sortedTests = sortTests(filteredTests, sortBy);

  if (sortedTests.length === 0) {
    return (
      <div className="px-content-padding py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-text-muted" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
            No Results Found
          </h3>
          <p className="text-text-secondary">
            No tests match your current filter criteria. Try adjusting your filters to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-content-padding py-6">
      {/* Mobile Layout - Single Column */}
      <div className="md:hidden space-y-4">
        {sortedTests.map((test) => (
          <DiagnosticResultCard
            key={test.id}
            test={test}
            isExpanded={expandedCards.has(test.id)}
            onToggleExpand={() => handleToggleExpand(test.id)}
          />
        ))}
      </div>

      {/* Tablet Layout - 2 Columns */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {sortedTests.map((test) => (
          <DiagnosticResultCard
            key={test.id}
            test={test}
            isExpanded={expandedCards.has(test.id)}
            onToggleExpand={() => handleToggleExpand(test.id)}
          />
        ))}
      </div>

      {/* Desktop Layout - 3 Columns */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {sortedTests.map((test) => (
          <DiagnosticResultCard
            key={test.id}
            test={test}
            isExpanded={expandedCards.has(test.id)}
            onToggleExpand={() => handleToggleExpand(test.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;