import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CodeBlock from './CodeBlock';

const FixInstructionPanel = ({ issue, onMarkComplete }) => {
  if (!issue) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div>
          <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Select an Issue to View Instructions
          </h3>
          <p className="text-text-secondary">
            Choose an issue from the sidebar to see detailed fix instructions
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className={`border rounded-lg p-4 ${getSeverityBg(issue.severity)}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className={getSeverityColor(issue.severity)} />
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                issue.severity === 'high' ? 'bg-error-100 text-error' :
                issue.severity === 'medium'? 'bg-warning-100 text-warning' : 'bg-success-100 text-success'
              }`}>
                {issue.severity.toUpperCase()} PRIORITY
              </span>
            </div>
            <Button
              variant={issue.completed ? "success" : "primary"}
              iconName={issue.completed ? "Check" : "CheckCircle"}
              onClick={onMarkComplete}
              size="sm"
            >
              {issue.completed ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
          
          <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
            {issue.title}
          </h1>
          
          <p className="text-text-secondary mb-4">
            {issue.description}
          </p>

          <div className="flex items-center space-x-6 text-sm text-text-muted">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>Estimated Time: {issue.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BarChart3" size={16} />
              <span>Difficulty: {issue.difficulty}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="User" size={16} />
              <span>Skills: {issue.requiredSkills}</span>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <section>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-warning" />
            <span>Problem Description</span>
          </h2>
          <div className="bg-surface border border-border rounded-lg p-4">
            <p className="text-text-secondary leading-relaxed">
              {issue.problemDescription}
            </p>
          </div>
        </section>

        {/* Root Cause Analysis */}
        <section>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Search" size={20} className="text-accent" />
            <span>Root Cause Analysis</span>
          </h2>
          <div className="bg-surface border border-border rounded-lg p-4">
            <p className="text-text-secondary leading-relaxed">
              {issue.rootCause}
            </p>
          </div>
        </section>

        {/* Step-by-Step Solution */}
        <section>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="List" size={20} className="text-primary" />
            <span>Step-by-Step Solution</span>
          </h2>
          <div className="space-y-4">
            {issue.steps.map((step, index) => (
              <div key={index} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full 
                                flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-2">{step.title}</h3>
                    <p className="text-text-secondary mb-3">{step.description}</p>
                    {step.code && (
                      <CodeBlock
                        code={step.code}
                        language={step.language || 'javascript'}
                        title={step.codeTitle}
                        description={step.codeDescription}
                      />
                    )}
                    {step.note && (
                      <div className="mt-3 p-3 bg-accent-50 border border-accent-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Icon name="Info" size={16} className="text-accent mt-0.5" />
                          <p className="text-sm text-accent-700">{step.note}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before/After Examples */}
        {issue.beforeAfter && (
          <section>
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="GitCompare" size={20} className="text-success" />
              <span>Before & After Examples</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-text-primary mb-2 flex items-center space-x-2">
                  <Icon name="X" size={16} className="text-error" />
                  <span>Before (Incorrect)</span>
                </h3>
                <CodeBlock
                  code={issue.beforeAfter.before}
                  language={issue.beforeAfter.language}
                  title="Current Implementation"
                />
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-2 flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>After (Correct)</span>
                </h3>
                <CodeBlock
                  code={issue.beforeAfter.after}
                  language={issue.beforeAfter.language}
                  title="Fixed Implementation"
                />
              </div>
            </div>
          </section>
        )}

        {/* Testing & Verification */}
        <section>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="TestTube" size={20} className="text-warning" />
            <span>Testing & Verification</span>
          </h2>
          <div className="bg-surface border border-border rounded-lg p-4">
            <p className="text-text-secondary leading-relaxed mb-3">
              {issue.testing}
            </p>
            {issue.testingSteps && (
              <ul className="space-y-2">
                {issue.testingSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span className="text-text-secondary">{step}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Additional Resources */}
        {issue.resources && issue.resources.length > 0 && (
          <section>
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="ExternalLink" size={20} className="text-accent" />
              <span>Additional Resources</span>
            </h2>
            <div className="bg-surface border border-border rounded-lg p-4">
              <ul className="space-y-2">
                {issue.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-accent hover:text-accent-600 
                               transition-micro"
                    >
                      <Icon name="ExternalLink" size={16} />
                      <span>{resource.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FixInstructionPanel;