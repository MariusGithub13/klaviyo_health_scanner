import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ selectedIssue }) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    {
      label: 'Diagnostic Results',
      path: '/diagnostic-results-dashboard',
      icon: 'BarChart3'
    },
    {
      label: 'Technical Fixes',
      path: '/technical-fix-instructions',
      icon: 'Wrench'
    }
  ];

  if (selectedIssue) {
    breadcrumbItems.push({
      label: selectedIssue.title,
      path: null,
      icon: 'FileText'
    });
  }

  return (
    <nav className="bg-surface border-b border-border">
      <div className="px-6 py-3">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-text-muted" />
              )}
              
              {item.path ? (
                <button
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-1 text-accent hover:text-accent-600 transition-micro font-medium"
                >
                  <Icon name={item.icon} size={14} />
                  <span>{item.label}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1 text-text-primary font-medium">
                  <Icon name={item.icon} size={14} />
                  <span className="truncate max-w-xs">{item.label}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;