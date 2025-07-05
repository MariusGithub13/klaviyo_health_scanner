import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StartScanButton = ({ isUrlValid, selectedTests, storeUrl }) => {
  const navigate = useNavigate();
  
  const canStartScan = isUrlValid && selectedTests.length > 0;
  
  const handleStartScan = () => {
    if (!canStartScan) return;
    
    // Store scan configuration in sessionStorage for the next page
    const scanConfig = {
      storeUrl,
      selectedTests,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem('klaviyo-scan-config', JSON.stringify(scanConfig));
    
    // Navigate to scan progress page
    navigate('/diagnostic-scan-progress');
  };

  const getButtonText = () => {
    if (!isUrlValid) {
      return 'Enter Valid Store URL';
    }
    if (selectedTests.length === 0) {
      return 'Select Tests to Continue';
    }
    return `Start Diagnostic Scan (${selectedTests.length} test${selectedTests.length !== 1 ? 's' : ''})`;
  };

  const getEstimatedTime = () => {
    if (selectedTests.length === 0) return 0;
    return Math.ceil(selectedTests.length * 2.5);
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <Button
          variant="primary"
          size="xl"
          iconName="Play"
          iconPosition="left"
          onClick={handleStartScan}
          disabled={!canStartScan}
          className="px-8 py-4 text-lg font-semibold shadow-card hover:shadow-card-hover"
        >
          {getButtonText()}
        </Button>
        
        {canStartScan && (
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>~{getEstimatedTime()} minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} />
              <span>Secure & Private</span>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-surface border border-border rounded-lg">
            <Icon name="Zap" size={24} className="text-accent mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">Real-time Analysis</h4>
            <p className="text-xs text-text-secondary">
              Live scanning with instant results
            </p>
          </div>
          
          <div className="p-4 bg-surface border border-border rounded-lg">
            <Icon name="FileText" size={24} className="text-primary mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">Detailed Report</h4>
            <p className="text-xs text-text-secondary">
              PDF with code snippets & fixes
            </p>
          </div>
          
          <div className="p-4 bg-surface border border-border rounded-lg">
            <Icon name="Lock" size={24} className="text-success mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">Data Security</h4>
            <p className="text-xs text-text-secondary">
              No data stored or shared
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScanButton;