import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DiagnosticTestCard = ({ test, isSelected, onToggle }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCardClick = () => {
    onToggle(test.id);
  };

  const handleTooltipToggle = (e) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-50 border-error-200';
      case 'high':
        return 'bg-warning-50 border-warning-200';
      case 'medium':
        return 'bg-accent-50 border-accent-200';
      default:
        return 'bg-secondary-50 border-secondary-200';
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleCardClick}
        className={`
          relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
          hover:shadow-card-hover
          ${isSelected 
            ? 'border-primary bg-primary-50 shadow-card' 
            : 'border-border bg-surface hover:border-primary-200'
          }
        `}
      >
        {/* Selection Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${isSelected 
              ? 'border-primary bg-primary text-primary-foreground' 
              : 'border-secondary-300 bg-surface'
            }
          `}>
            {isSelected && <Icon name="Check" size={14} strokeWidth={2.5} />}
          </div>
        </div>

        {/* Test Icon */}
        <div className={`
          inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4
          ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary-100 text-text-secondary'}
        `}>
          <Icon name={test.icon} size={24} strokeWidth={2} />
        </div>

        {/* Test Title and Severity */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-text-primary text-lg leading-tight">
              {test.title}
            </h3>
            <button
              onClick={handleTooltipToggle}
              className="p-1 rounded-full hover:bg-secondary-100 transition-micro"
              aria-label="More information"
            >
              <Icon name="Info" size={16} className="text-text-muted" />
            </button>
          </div>
          
          <div className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
            ${getSeverityBg(test.severity)}
          `}>
            <span className={getSeverityColor(test.severity)}>
              {test.severity.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Test Description */}
        <p className="text-text-secondary text-sm leading-relaxed">
          {test.description}
        </p>

        {/* Estimated Time */}
        <div className="mt-4 flex items-center space-x-2 text-xs text-text-muted">
          <Icon name="Clock" size={14} />
          <span>~{test.estimatedTime}</span>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-surface border border-border rounded-lg shadow-modal">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-heading font-semibold text-text-primary">
              {test.title}
            </h4>
            <button
              onClick={handleTooltipToggle}
              className="p-1 rounded-full hover:bg-secondary-100 transition-micro"
            >
              <Icon name="X" size={16} className="text-text-muted" />
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="text-text-secondary leading-relaxed">
              {test.detailedDescription}
            </p>
            
            <div>
              <h5 className="font-medium text-text-primary mb-1">What we check:</h5>
              <ul className="space-y-1 text-text-secondary">
                {test.checkpoints.map((checkpoint, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="ChevronRight" size={14} className="text-text-muted mt-0.5 flex-shrink-0" />
                    <span>{checkpoint}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t border-border-muted">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>Impact: {test.impact}</span>
                <span>Time: {test.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticTestCard;