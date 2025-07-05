import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ScanControls = ({ 
  scanStatus, 
  onCancelScan, 
  onViewResults, 
  showViewResults,
  isScanning 
}) => {
  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-3">
          <div className={`
            w-3 h-3 rounded-full animate-pulse
            ${scanStatus === 'scanning' ? 'bg-primary' :
              scanStatus === 'completed' ? 'bg-success' :
              scanStatus === 'failed'? 'bg-error' : 'bg-text-muted'
            }
          `} />
          <span className="text-sm font-medium text-text-primary">
            {scanStatus === 'scanning' ? 'Scan in progress...' :
             scanStatus === 'completed' ? 'Scan completed successfully' :
             scanStatus === 'failed'? 'Scan encountered errors' : 'Preparing scan...'
            }
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {isScanning && (
            <Button
              variant="outline"
              iconName="X"
              onClick={onCancelScan}
              className="text-error border-error hover:bg-error-50"
            >
              Cancel Scan
            </Button>
          )}
          
          {showViewResults && (
            <Button
              variant="primary"
              iconName="BarChart3"
              iconPosition="right"
              onClick={onViewResults}
              className="animate-pulse"
            >
              View Results
            </Button>
          )}
        </div>
      </div>

      {/* Scan Status Messages */}
      {scanStatus === 'failed' && (
        <div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error">Scan Incomplete</p>
              <p className="text-xs text-error-600 mt-1">
                Some tests failed to complete. You can still view partial results or restart the scan.
              </p>
            </div>
          </div>
        </div>
      )}

      {scanStatus === 'completed' && (
        <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success">Scan Complete</p>
              <p className="text-xs text-success-600 mt-1">
                All diagnostic tests have been completed. Click 'View Results' to see your integration health report.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanControls;