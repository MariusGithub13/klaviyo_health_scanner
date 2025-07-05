import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';


const ContextualActionBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActionsForPage = () => {
    switch (location.pathname) {
      case '/diagnostic-results-dashboard':
        return [
          {
            label: 'Generate Report',
            variant: 'primary',
            iconName: 'FileText',
            onClick: () => navigate('/pdf-report-generation-lead-capture'),
            primary: true
          },
          {
            label: 'Export Data',
            variant: 'secondary',
            iconName: 'Download',
            onClick: () => handleExportData(),
            primary: false
          },
          {
            label: 'View Technical Fixes',
            variant: 'outline',
            iconName: 'Wrench',
            onClick: () => navigate('/technical-fix-instructions'),
            primary: false
          }
        ];

      case '/pdf-report-generation-lead-capture':
        return [
          {
            label: 'Download PDF',
            variant: 'primary',
            iconName: 'Download',
            onClick: () => handleDownloadPDF(),
            primary: true
          },
          {
            label: 'Email Report',
            variant: 'secondary',
            iconName: 'Mail',
            onClick: () => handleEmailReport(),
            primary: false
          },
          {
            label: 'Back to Results',
            variant: 'ghost',
            iconName: 'ArrowLeft',
            onClick: () => navigate('/diagnostic-results-dashboard'),
            primary: false
          }
        ];

      case '/diagnostic-scan-progress':
        return [
          {
            label: 'Cancel Scan',
            variant: 'outline',
            iconName: 'X',
            onClick: () => handleCancelScan(),
            primary: false
          }
        ];

      default:
        return [];
    }
  };

  const handleExportData = () => {
    // Export functionality
    console.log('Exporting diagnostic data...');
  };

  const handleDownloadPDF = () => {
    // PDF download functionality
    console.log('Downloading PDF report...');
  };

  const handleEmailReport = () => {
    // Email report functionality
    console.log('Emailing report...');
  };

  const handleCancelScan = () => {
    // Cancel scan functionality
    navigate('/store-url-input-test-selection');
  };

  const actions = getActionsForPage();

  // Don't render if no actions for current page
  if (actions.length === 0) {
    return null;
  }

  const primaryActions = actions.filter(action => action.primary);
  const secondaryActions = actions.filter(action => !action.primary);

  return (
    <>
      {/* Desktop Action Bar */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <div className="flex items-center space-x-3">
          {/* Secondary Actions */}
          {secondaryActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              iconName={action.iconName}
              onClick={action.onClick}
              className="shadow-card hover:shadow-card-hover"
            >
              {action.label}
            </Button>
          ))}
          
          {/* Primary Actions */}
          {primaryActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              iconName={action.iconName}
              onClick={action.onClick}
              size="lg"
              className="shadow-card hover:shadow-card-hover"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
        <div className="px-content-padding py-4">
          <div className="flex flex-col space-y-3">
            {/* Primary Actions First on Mobile */}
            {primaryActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                iconName={action.iconName}
                iconPosition="left"
                onClick={action.onClick}
                fullWidth
                size="lg"
              >
                {action.label}
              </Button>
            ))}
            
            {/* Secondary Actions */}
            {secondaryActions.length > 0 && (
              <div className="flex space-x-2">
                {secondaryActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    iconName={action.iconName}
                    onClick={action.onClick}
                    className="flex-1"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Spacer to prevent content overlap */}
      <div className="md:hidden h-20" />
    </>
  );
};

export default ContextualActionBar;