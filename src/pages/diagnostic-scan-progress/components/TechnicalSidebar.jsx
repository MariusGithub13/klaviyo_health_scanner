import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TechnicalSidebar = ({ currentTest, scanLogs, apiCalls }) => {
  const [activeTab, setActiveTab] = useState('current');

  const tabs = [
    { id: 'current', label: 'Current Test', icon: 'Activity' },
    { id: 'logs', label: 'Scan Logs', icon: 'FileText' },
    { id: 'api', label: 'API Calls', icon: 'Zap' }
  ];

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="hidden lg:block w-80 bg-surface border-l border-border h-full overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary mb-3">
          Technical Details
        </h3>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-secondary-50 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro
                ${activeTab === tab.id 
                  ? 'bg-surface text-primary shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 h-full overflow-y-auto">
        {/* Current Test Tab */}
        {activeTab === 'current' && currentTest && (
          <div className="space-y-4">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="animate-spin">
                  <Icon name="Loader2" size={16} className="text-primary" />
                </div>
                <span className="font-medium text-primary">Active Test</span>
              </div>
              <h4 className="font-medium text-text-primary mb-2">{currentTest.name}</h4>
              <p className="text-sm text-text-secondary mb-3">{currentTest.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Progress</span>
                  <span className="font-medium">{currentTest.progress}%</span>
                </div>
                <div className="w-full bg-primary-100 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentTest.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-text-primary">Test Steps</h5>
              {currentTest.steps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`
                    w-2 h-2 rounded-full mt-2 flex-shrink-0
                    ${step.completed ? 'bg-success' : step.active ?'bg-primary animate-pulse': 'bg-secondary-300'
                    }
                  `} />
                  <div>
                    <p className={`text-sm ${step.completed ? 'text-success' : 'text-text-primary'}`}>
                      {step.name}
                    </p>
                    {step.active && (
                      <p className="text-xs text-text-secondary mt-1">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scan Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-3">
            <h5 className="font-medium text-text-primary">Recent Activity</h5>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {scanLogs.map((log, index) => (
                <div key={index} className="text-xs p-2 bg-secondary-50 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${getLogLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-text-muted">{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <p className="text-text-secondary">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Calls Tab */}
        {activeTab === 'api' && (
          <div className="space-y-3">
            <h5 className="font-medium text-text-primary">API Activity</h5>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {apiCalls.map((call, index) => (
                <div key={index} className="text-xs p-2 bg-secondary-50 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary">{call.method}</span>
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs
                      ${call.status >= 200 && call.status < 300 ? 'bg-success-100 text-success' :
                        call.status >= 400 ? 'bg-error-100 text-error': 'bg-warning-100 text-warning'
                      }
                    `}>
                      {call.status}
                    </span>
                  </div>
                  <p className="text-text-secondary truncate">{call.endpoint}</p>
                  <p className="text-text-muted mt-1">{formatTimestamp(call.timestamp)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalSidebar;