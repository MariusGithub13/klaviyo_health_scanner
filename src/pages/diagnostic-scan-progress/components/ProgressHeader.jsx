import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressHeader = ({ overallProgress, estimatedTimeRemaining, currentStep, totalSteps }) => {
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
            Scanning Your Integration
          </h1>
          <p className="text-text-secondary">
            Analyzing your Shopify-Klaviyo setup for potential issues
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Est. {formatTime(estimatedTimeRemaining)} remaining</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} />
            <span>Step {currentStep} of {totalSteps}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text-primary">Overall Progress</span>
          <span className="text-text-secondary">{overallProgress}%</span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${overallProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        
        {/* Mobile Time and Step Info */}
        <div className="md:hidden flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} />
            <span>{formatTime(estimatedTimeRemaining)} left</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={14} />
            <span>{currentStep}/{totalSteps}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;