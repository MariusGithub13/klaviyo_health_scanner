import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryMetrics = ({ metrics }) => {
  const metricCards = [
    {
      id: 'total-issues',
      title: 'Total Issues',
      value: metrics.totalIssues,
      icon: 'AlertCircle',
      color: 'text-text-primary',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200'
    },
    {
      id: 'critical-issues',
      title: 'Critical Issues',
      value: metrics.criticalIssues,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200'
    },
    {
      id: 'warnings',
      title: 'Warnings',
      value: metrics.warnings,
      icon: 'AlertOctagon',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200'
    },
    {
      id: 'passed-tests',
      title: 'Passed Tests',
      value: metrics.passedTests,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    }
  ];

  return (
    <div className="px-content-padding py-6">
      <div className="mb-4">
        <h2 className="font-heading font-semibold text-lg text-text-primary">
          Scan Summary
        </h2>
        <p className="text-sm text-text-secondary">
          Overview of your Klaviyo integration health
        </p>
      </div>

      {/* Mobile Layout - Stacked Cards */}
      <div className="md:hidden space-y-3">
        {metricCards.map((metric) => (
          <div
            key={metric.id}
            className={`p-4 rounded-lg border ${metric.bgColor} ${metric.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={metric.icon} size={20} className={metric.color} strokeWidth={2} />
                <span className="font-medium text-text-primary">{metric.title}</span>
              </div>
              <span className={`text-xl font-bold ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout - Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <div
            key={metric.id}
            className={`p-6 rounded-lg border ${metric.bgColor} ${metric.borderColor} 
                       hover:shadow-card transition-micro`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric.icon} size={24} className={metric.color} strokeWidth={2} />
              <span className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </span>
            </div>
            <p className="text-sm font-medium text-text-primary">{metric.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryMetrics;