import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowProgressIndicator = () => {
  const location = useLocation();

  const workflowSteps = [
    {
      id: 1,
      label: 'Setup',
      description: 'Store URL & Test Selection',
      path: '/store-url-input-test-selection',
      icon: 'Settings'
    },
    {
      id: 2,
      label: 'Scanning',
      description: 'Diagnostic Scan Progress',
      path: '/diagnostic-scan-progress',
      icon: 'Search'
    },
    {
      id: 3,
      label: 'Results',
      description: 'Diagnostic Results Dashboard',
      path: '/diagnostic-results-dashboard',
      icon: 'BarChart3'
    },
    {
      id: 4,
      label: 'Report',
      description: 'PDF Report & Lead Capture',
      path: '/pdf-report-generation-lead-capture',
      icon: 'FileText'
    }
  ];

  const getCurrentStepIndex = () => {
    const currentPath = location.pathname;
    const stepIndex = workflowSteps.findIndex(step => step.path === currentPath);
    return stepIndex >= 0 ? stepIndex : 0;
  };

  const currentStepIndex = getCurrentStepIndex();
  const isWorkflowPath = workflowSteps.some(step => step.path === location.pathname);

  // Don't render on technical documentation page
  if (!isWorkflowPath) {
    return null;
  }

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-content-padding py-4">
        {/* Mobile Progress Bar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Step {currentStepIndex + 1} of {workflowSteps.length}
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round(((currentStepIndex + 1) / workflowSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-workflow"
              style={{ width: `${((currentStepIndex + 1) / workflowSteps.length) * 100}%` }}
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-text-primary">
              {workflowSteps[currentStepIndex]?.label}
            </h3>
            <p className="text-sm text-text-secondary">
              {workflowSteps[currentStepIndex]?.description}
            </p>
          </div>
        </div>

        {/* Desktop Step Indicators */}
        <div className="hidden md:flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === workflowSteps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-micro
                    ${status === 'completed' 
                      ? 'bg-success border-success text-success-foreground' 
                      : status === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-surface border-secondary-300 text-text-muted'
                    }
                  `}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} strokeWidth={2.5} />
                    ) : (
                      <Icon name={step.icon} size={16} strokeWidth={2} />
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="ml-3">
                    <div className={`
                      text-sm font-medium transition-micro
                      ${status === 'current' ?'text-primary' 
                        : status === 'completed' ?'text-success' :'text-text-muted'
                      }
                    `}>
                      {step.label}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`
                      h-0.5 transition-micro
                      ${index < currentStepIndex 
                        ? 'bg-success' :'bg-secondary-200'
                      }
                    `} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgressIndicator;