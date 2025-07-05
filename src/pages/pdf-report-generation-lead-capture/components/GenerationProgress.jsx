import React from 'react';
import Icon from '../../../components/AppIcon';

const GenerationProgress = ({ 
  isGenerating, 
  progress, 
  currentStep, 
  estimatedTime,
  onCancel 
}) => {
  const generationSteps = [
    {
      id: 'analyzing',
      title: 'Analyzing Results',
      description: 'Processing diagnostic data',
      icon: 'Search'
    },
    {
      id: 'formatting',
      title: 'Formatting Report',
      description: 'Creating professional layout',
      icon: 'Layout'
    },
    {
      id: 'generating',
      title: 'Generating PDF',
      description: 'Compiling final document',
      icon: 'FileText'
    },
    {
      id: 'finalizing',
      title: 'Finalizing',
      description: 'Preparing download',
      icon: 'Download'
    }
  ];

  if (!isGenerating) return null;

  const currentStepIndex = generationSteps.findIndex(step => step.id === currentStep);
  const progressPercentage = Math.min(progress, 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Generating Your Report
          </h2>
          <p className="text-sm text-text-secondary">
            Please wait while we create your comprehensive diagnostic report
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Progress
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon 
                  name={generationSteps[currentStepIndex]?.icon || 'Loader'} 
                  size={16} 
                  className="text-white animate-spin" 
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-primary">
                {generationSteps[currentStepIndex]?.title || 'Processing...'}
              </h3>
              <p className="text-xs text-text-secondary">
                {generationSteps[currentStepIndex]?.description || 'Please wait...'}
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {generationSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isUpcoming = index > currentStepIndex;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-micro
                    ${isCompleted 
                      ? 'bg-success text-white' 
                      : isCurrent 
                      ? 'bg-primary text-white' :'bg-secondary-200 text-text-muted'
                    }
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      <Icon name={step.icon} size={14} />
                    )}
                  </div>
                  <span className={`
                    text-xs text-center max-w-16
                    ${isCurrent ? 'text-primary font-medium' : 'text-text-muted'}
                  `}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estimated Time */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Estimated time remaining: {estimatedTime}</span>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="text-center">
          <button
            onClick={onCancel}
            className="text-sm text-text-secondary hover:text-text-primary transition-micro
                     underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     rounded px-2 py-1"
          >
            Cancel Generation
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;