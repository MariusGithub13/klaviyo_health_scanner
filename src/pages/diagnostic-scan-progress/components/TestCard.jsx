import React from 'react';
import Icon from '../../../components/AppIcon';

const TestCard = ({ test, isActive }) => {
  const getStatusIcon = () => {
    switch (test.status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'in-progress':
        return (
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-primary" />
          </div>
        );
      default:
        return <Icon name="Circle" size={20} className="text-text-muted" />;
    }
  };

  const getStatusColor = () => {
    switch (test.status) {
      case 'completed':
        return 'border-success bg-success-50';
      case 'failed':
        return 'border-error bg-error-50';
      case 'in-progress':
        return 'border-primary bg-primary-50';
      default:
        return 'border-border bg-surface';
    }
  };

  const getStatusText = () => {
    switch (test.status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'in-progress':
        return test.progressText || 'Analyzing...';
      default:
        return 'Pending';
    }
  };

  return (
    <div className={`
      relative rounded-lg border-2 p-4 transition-all duration-300
      ${getStatusColor()}
      ${isActive ? 'shadow-card-hover scale-105' : 'shadow-card'}
    `}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary mb-1 truncate">
            {test.name}
          </h3>
          <p className="text-sm text-text-secondary mb-2 line-clamp-2">
            {test.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className={`
              text-xs font-medium px-2 py-1 rounded-full
              ${test.status === 'completed' ? 'bg-success-100 text-success' :
                test.status === 'failed' ? 'bg-error-100 text-error' :
                test.status === 'in-progress'? 'bg-primary-100 text-primary' : 'bg-secondary-100 text-text-muted'
              }
            `}>
              {getStatusText()}
            </span>
            
            {test.status === 'in-progress' && test.progress && (
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-secondary-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${test.progress}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">{test.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default TestCard;