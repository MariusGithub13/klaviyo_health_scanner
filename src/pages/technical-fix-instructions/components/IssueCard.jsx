import React from 'react';
import Icon from '../../../components/AppIcon';


const IssueCard = ({ issue, isSelected, onSelect, onToggleComplete }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error-50 border-error-200';
      case 'medium': return 'bg-warning-50 border-warning-200';
      case 'low': return 'bg-success-50 border-success-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div 
      className={`
        border rounded-lg cursor-pointer transition-micro hover:shadow-card
        ${isSelected ? 'border-primary bg-primary-50' : 'border-border bg-surface'}
        ${getSeverityBg(issue.severity)}
      `}
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getSeverityIcon(issue.severity)} 
              size={16} 
              className={getSeverityColor(issue.severity)} 
            />
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              issue.severity === 'high' ? 'bg-error-100 text-error' :
              issue.severity === 'medium'? 'bg-warning-100 text-warning' : 'bg-success-100 text-success'
            }`}>
              {issue.severity.toUpperCase()}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className="text-text-muted hover:text-text-primary transition-micro"
          >
            <Icon 
              name={issue.completed ? "CheckCircle" : "Circle"} 
              size={18} 
              className={issue.completed ? "text-success" : "text-text-muted"}
            />
          </button>
        </div>

        <h3 className={`font-medium mb-2 ${
          issue.completed ? 'text-text-secondary line-through' : 'text-text-primary'
        }`}>
          {issue.title}
        </h3>

        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {issue.description}
        </p>

        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{issue.estimatedTime}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="BarChart3" size={12} />
              <span>{issue.difficulty}</span>
            </span>
          </div>
          {isSelected && (
            <Icon name="ChevronRight" size={14} className="text-primary" />
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueCard;