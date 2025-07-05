import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsHeader = ({ storeData, scanData, healthScore }) => {
  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getHealthScoreBg = (score) => {
    if (score >= 80) return 'bg-success-50 border-success-200';
    if (score >= 60) return 'bg-warning-50 border-warning-200';
    return 'bg-error-50 border-error-200';
  };

  const getHealthStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Needs Attention';
    return 'Critical Issues';
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-content-padding py-6">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={20} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h1 className="font-heading font-semibold text-lg text-text-primary">
                {storeData.name}
              </h1>
              <p className="text-sm text-text-secondary">
                Scanned on {scanData.date}
              </p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border ${getHealthScoreBg(healthScore.overall)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Integration Health</p>
                <p className={`text-lg font-semibold ${getHealthScoreColor(healthScore.overall)}`}>
                  {getHealthStatus(healthScore.overall)}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getHealthScoreColor(healthScore.overall)}`}>
                  {healthScore.overall}%
                </div>
                <p className="text-xs text-text-secondary">Overall Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={24} color="white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-xl text-text-primary">
                {storeData.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>Scanned on {scanData.date}</span>
                <span>•</span>
                <span>{scanData.testsRun} tests completed</span>
                <span>•</span>
                <span>Duration: {scanData.duration}</span>
              </div>
            </div>
          </div>

          <div className={`px-6 py-4 rounded-lg border ${getHealthScoreBg(healthScore.overall)}`}>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getHealthScoreColor(healthScore.overall)}`}>
                  {healthScore.overall}%
                </div>
                <p className="text-xs text-text-secondary">Overall Score</p>
              </div>
              <div className="border-l border-border pl-4">
                <p className="text-sm font-medium text-text-primary">Integration Health</p>
                <p className={`text-lg font-semibold ${getHealthScoreColor(healthScore.overall)}`}>
                  {getHealthStatus(healthScore.overall)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;