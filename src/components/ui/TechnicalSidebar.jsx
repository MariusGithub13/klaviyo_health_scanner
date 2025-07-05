import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TechnicalSidebar = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    'integration-issues': true,
    'api-configuration': false,
    'tracking-setup': false,
    'data-sync': false
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Only show on technical fix instructions page
  if (location.pathname !== '/technical-fix-instructions') {
    return null;
  }

  const technicalSections = [
    {
      id: 'integration-issues',
      title: 'Integration Issues',
      icon: 'AlertTriangle',
      severity: 'high',
      items: [
        { id: 'api-key-invalid', title: 'Invalid API Key', completed: false, severity: 'high' },
        { id: 'webhook-config', title: 'Webhook Configuration', completed: true, severity: 'medium' },
        { id: 'cors-policy', title: 'CORS Policy Issues', completed: false, severity: 'high' }
      ]
    },
    {
      id: 'api-configuration',
      title: 'API Configuration',
      icon: 'Settings',
      severity: 'medium',
      items: [
        { id: 'rate-limiting', title: 'Rate Limiting Setup', completed: true, severity: 'low' },
        { id: 'endpoint-mapping', title: 'Endpoint Mapping', completed: false, severity: 'medium' },
        { id: 'auth-headers', title: 'Authentication Headers', completed: false, severity: 'medium' }
      ]
    },
    {
      id: 'tracking-setup',
      title: 'Tracking Setup',
      icon: 'Target',
      severity: 'medium',
      items: [
        { id: 'pixel-installation', title: 'Pixel Installation', completed: false, severity: 'high' },
        { id: 'event-tracking', title: 'Event Tracking', completed: true, severity: 'medium' },
        { id: 'custom-properties', title: 'Custom Properties', completed: false, severity: 'low' }
      ]
    },
    {
      id: 'data-sync',
      title: 'Data Synchronization',
      icon: 'RefreshCw',
      severity: 'low',
      items: [
        { id: 'customer-sync', title: 'Customer Data Sync', completed: true, severity: 'medium' },
        { id: 'order-sync', title: 'Order Data Sync', completed: true, severity: 'medium' },
        { id: 'product-sync', title: 'Product Catalog Sync', completed: false, severity: 'low' }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const getCompletionStats = () => {
    const allItems = technicalSections.flatMap(section => section.items);
    const completedItems = allItems.filter(item => item.completed);
    return {
      completed: completedItems.length,
      total: allItems.length,
      percentage: Math.round((completedItems.length / allItems.length) * 100)
    };
  };

  const stats = getCompletionStats();

  return (
    <>
      {/* Mobile Dropdown Toggle */}
      <div className="lg:hidden bg-surface border-b border-border p-4">
        <button
          onClick={toggleMobileMenu}
          className="w-full flex items-center justify-between p-3 bg-secondary-50 rounded-lg 
                   text-text-primary hover:bg-secondary-100 transition-micro"
        >
          <div className="flex items-center space-x-2">
            <Icon name="List" size={20} />
            <span className="font-medium">Technical Issues</span>
            <span className="text-sm text-text-secondary">
              ({stats.completed}/{stats.total})
            </span>
          </div>
          <Icon name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} size={20} />
        </button>

        {isMobileMenuOpen && (
          <div className="mt-4 space-y-3">
            {technicalSections.map((section) => (
              <div key={section.id} className="border border-border rounded-lg">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-secondary-50 
                           transition-micro rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={section.icon} size={16} className={getSeverityColor(section.severity)} />
                    <span className="font-medium text-sm">{section.title}</span>
                  </div>
                  <Icon name={expandedSections[section.id] ? "ChevronUp" : "ChevronDown"} size={16} />
                </button>

                {expandedSections[section.id] && (
                  <div className="px-3 pb-3 space-y-2">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 text-sm">
                        <Icon 
                          name={item.completed ? "CheckCircle" : "Circle"} 
                          size={14} 
                          className={item.completed ? "text-success" : getSeverityColor(item.severity)}
                        />
                        <span className={item.completed ? "text-text-secondary line-through" : "text-text-primary"}>
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-header-height w-sidebar-width h-[calc(100vh-theme(spacing.header-height))] 
                      bg-surface border-r border-border overflow-y-auto z-sidebar">
        <div className="p-6">
          {/* Progress Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-heading font-semibold text-lg text-text-primary">
                Technical Issues
              </h2>
              <span className="text-sm text-text-secondary">
                {stats.completed}/{stats.total}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-workflow"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
            <p className="text-sm text-text-secondary">
              {stats.percentage}% issues resolved
            </p>
          </div>

          {/* Issue Sections */}
          <div className="space-y-4">
            {technicalSections.map((section) => (
              <div key={section.id} className={`border rounded-lg ${getSeverityBg(section.severity)}`}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-80 
                           transition-micro rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={section.icon} size={18} className={getSeverityColor(section.severity)} />
                    <div>
                      <h3 className="font-medium text-text-primary">{section.title}</h3>
                      <p className="text-xs text-text-secondary">
                        {section.items.filter(item => item.completed).length}/{section.items.length} completed
                      </p>
                    </div>
                  </div>
                  <Icon 
                    name={expandedSections[section.id] ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-text-secondary"
                  />
                </button>

                {expandedSections[section.id] && (
                  <div className="px-4 pb-4 space-y-3">
                    {section.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center space-x-3 p-2 bg-surface rounded border border-border-muted
                                 hover:shadow-card transition-micro cursor-pointer"
                      >
                        <Icon 
                          name={item.completed ? "CheckCircle" : "Circle"} 
                          size={16} 
                          className={item.completed ? "text-success" : getSeverityColor(item.severity)}
                        />
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${
                            item.completed ? "text-text-secondary line-through" : "text-text-primary"
                          }`}>
                            {item.title}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              item.severity === 'high' ? 'bg-error-100 text-error' :
                              item.severity === 'medium'? 'bg-warning-100 text-warning' : 'bg-success-100 text-success'
                            }`}>
                              {item.severity}
                            </span>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={14} className="text-text-muted" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default TechnicalSidebar;