import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import IssueCard from './IssueCard';

const ProgressSidebar = ({ issues, selectedIssue, onSelectIssue, onToggleComplete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const getCompletionStats = () => {
    const completedIssues = issues.filter(issue => issue.completed);
    return {
      completed: completedIssues.length,
      total: issues.length,
      percentage: Math.round((completedIssues.length / issues.length) * 100)
    };
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || issue.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const stats = getCompletionStats();

  return (
    <div className="h-full flex flex-col bg-surface border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg text-text-primary">
            Technical Issues
          </h2>
          <span className="text-sm text-text-secondary">
            {stats.completed}/{stats.total}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Progress</span>
            <span className="text-sm text-text-secondary">{stats.percentage}%</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-workflow"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     bg-surface text-text-primary placeholder-text-muted"
          />
        </div>

        {/* Severity Filter */}
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   bg-surface text-text-primary"
        >
          <option value="all">All Severities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-secondary">No issues found</p>
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              isSelected={selectedIssue?.id === issue.id}
              onSelect={() => onSelectIssue(issue)}
              onToggleComplete={() => onToggleComplete(issue.id)}
            />
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <button
            onClick={() => {
              issues.forEach(issue => {
                if (!issue.completed) {
                  onToggleComplete(issue.id);
                }
              });
            }}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 
                     bg-success text-success-foreground rounded-lg hover:bg-success/90 
                     transition-micro text-sm font-medium"
          >
            <Icon name="CheckCircle" size={16} />
            <span>Mark All Complete</span>
          </button>
          
          <button
            onClick={() => {
              const highPriorityIssues = issues.filter(issue => issue.severity === 'high' && !issue.completed);
              if (highPriorityIssues.length > 0) {
                onSelectIssue(highPriorityIssues[0]);
              }
            }}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 
                     bg-error text-error-foreground rounded-lg hover:bg-error/90 
                     transition-micro text-sm font-medium"
          >
            <Icon name="AlertTriangle" size={16} />
            <span>Focus High Priority</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;