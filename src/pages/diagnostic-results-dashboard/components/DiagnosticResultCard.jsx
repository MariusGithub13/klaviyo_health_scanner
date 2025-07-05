import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiagnosticResultCard = ({ test, isExpanded, onToggleExpand }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'text-error',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200',
          icon: 'AlertTriangle'
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200',
          icon: 'AlertOctagon'
        };
      case 'info':
        return {
          color: 'text-accent',
          bgColor: 'bg-accent-50',
          borderColor: 'border-accent-200',
          icon: 'Info'
        };
      default:
        return {
          color: 'text-text-secondary',
          bgColor: 'bg-secondary-50',
          borderColor: 'border-secondary-200',
          icon: 'AlertCircle'
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'passed':
        return {
          color: 'text-success',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          icon: 'CheckCircle',
          label: 'Passed'
        };
      case 'failed':
        return {
          color: 'text-error',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200',
          icon: 'XCircle',
          label: 'Failed'
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200',
          icon: 'AlertTriangle',
          label: 'Warning'
        };
      default:
        return {
          color: 'text-text-secondary',
          bgColor: 'bg-secondary-50',
          borderColor: 'border-secondary-200',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const severityConfig = getSeverityConfig(test.severity);
  const statusConfig = getStatusConfig(test.status);

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card hover:shadow-card-hover transition-micro">
      {/* Card Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-heading font-semibold text-text-primary">
                {test.name}
              </h3>
              <button
                className="text-text-muted hover:text-text-secondary transition-micro"
                title={test.tooltip}
              >
                <Icon name="HelpCircle" size={16} />
              </button>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">
              {test.description}
            </p>

            <div className="flex items-center space-x-3">
              {/* Status Badge */}
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                             ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                <Icon name={statusConfig.icon} size={12} className={statusConfig.color} />
                <span className={statusConfig.color}>{statusConfig.label}</span>
              </div>

              {/* Severity Badge */}
              {test.severity && (
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                               ${severityConfig.bgColor} ${severityConfig.borderColor} border`}>
                  <Icon name={severityConfig.icon} size={12} className={severityConfig.color} />
                  <span className={severityConfig.color}>{test.severity.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={onToggleExpand}
            className="ml-2"
          />
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Detailed Findings */}
          {test.findings && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Detailed Findings</h4>
              <div className="bg-secondary-50 rounded-lg p-3">
                <p className="text-sm text-text-primary">{test.findings}</p>
              </div>
            </div>
          )}

          {/* Affected Data Examples */}
          {test.affectedData && test.affectedData.length > 0 && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Affected Data Examples</h4>
              <div className="space-y-2">
                {test.affectedData.map((data, index) => (
                  <div key={index} className="bg-error-50 border border-error-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{data.type}</p>
                        <p className="text-xs text-text-secondary mt-1">{data.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fix Recommendations */}
          {test.recommendations && test.recommendations.length > 0 && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Recommended Actions</h4>
              <div className="space-y-2">
                {test.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                    <p className="text-sm text-text-primary">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippet Preview */}
          {test.codeSnippet && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Code Fix Preview</h4>
              <div className="bg-secondary-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-sm text-secondary-100 font-mono">
                  <code>{test.codeSnippet}</code>
                </pre>
              </div>
              <p className="text-xs text-text-secondary mt-2">
                Complete implementation details available in technical documentation
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
            <Button
              variant="primary"
              iconName="FileText"
              iconPosition="left"
              className="flex-1"
            >
              View Fix Details
            </Button>
            <Button
              variant="outline"
              iconName="Copy"
              iconPosition="left"
              className="flex-1"
            >
              Copy Code
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticResultCard;