import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ProgressHeader from './components/ProgressHeader';
import TestCard from './components/TestCard';
import ScanControls from './components/ScanControls';
import TechnicalSidebar from './components/TechnicalSidebar';

const DiagnosticScanProgress = () => {
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState('scanning');
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(180);
  const [activeTestIndex, setActiveTestIndex] = useState(0);

  // Mock diagnostic tests data
  const [diagnosticTests, setDiagnosticTests] = useState([
    {
      id: 'purchase-tracking',
      name: 'Purchase Event Tracking',
      description: 'Verifying that purchase events are properly sent to Klaviyo when customers complete orders',
      status: 'completed',
      progress: 100,
      progressText: 'Completed successfully'
    },
    {
      id: 'currency-formatting',
      name: 'Currency Formatting',
      description: 'Checking if product prices and order values are formatted correctly for international customers',
      status: 'completed',
      progress: 100,
      progressText: 'Completed successfully'
    },
    {
      id: 'utm-parameters',
      name: 'UTM Parameter Tracking',
      description: 'Ensuring UTM parameters from marketing campaigns are captured and passed to Klaviyo',
      status: 'in-progress',
      progress: 65,
      progressText: 'Analyzing campaign attribution data...'
    },
    {
      id: 'double-optin',
      name: 'Double Opt-in Conflicts',
      description: 'Identifying conflicts between Shopify and Klaviyo double opt-in settings',
      status: 'pending',
      progress: 0,
      progressText: 'Waiting to start...'
    },
    {
      id: 'product-sync',
      name: 'Product Catalog Sync',
      description: 'Verifying that product information syncs correctly between Shopify and Klaviyo',
      status: 'pending',
      progress: 0,
      progressText: 'Waiting to start...'
    },
    {
      id: 'duplicate-profiles',
      name: 'Duplicate Profile Detection',
      description: 'Scanning for duplicate customer profiles that could affect email deliverability',
      status: 'pending',
      progress: 0,
      progressText: 'Waiting to start...'
    },
    {
      id: 'gdpr-consent',
      name: 'GDPR Consent Mapping',
      description: 'Checking if GDPR consent preferences are properly mapped between platforms',
      status: 'pending',
      progress: 0,
      progressText: 'Waiting to start...'
    }
  ]);

  // Mock scan logs
  const [scanLogs] = useState([
    {
      level: 'info',
      message: 'Starting diagnostic scan for store: example-store.myshopify.com',
      timestamp: Date.now() - 120000
    },
    {
      level: 'success',
      message: 'Successfully connected to Shopify Storefront API',
      timestamp: Date.now() - 110000
    },
    {
      level: 'success',
      message: 'Klaviyo API connection established',
      timestamp: Date.now() - 100000
    },
    {
      level: 'info',
      message: 'Purchase event tracking test completed - 15 events analyzed',
      timestamp: Date.now() - 80000
    },
    {
      level: 'success',
      message: 'Currency formatting validation passed',
      timestamp: Date.now() - 60000
    },
    {
      level: 'info',
      message: 'Analyzing UTM parameter capture - 8 campaigns found',
      timestamp: Date.now() - 30000
    },
    {
      level: 'warning',
      message: 'Potential UTM parameter loss detected in 2 campaigns',
      timestamp: Date.now() - 15000
    }
  ]);

  // Mock API calls
  const [apiCalls] = useState([
    {
      method: 'GET',
      endpoint: '/admin/api/2023-10/shop.json',
      status: 200,
      timestamp: Date.now() - 115000
    },
    {
      method: 'GET',
      endpoint: '/api/profiles',
      status: 200,
      timestamp: Date.now() - 105000
    },
    {
      method: 'GET',
      endpoint: '/admin/api/2023-10/orders.json',
      status: 200,
      timestamp: Date.now() - 85000
    },
    {
      method: 'POST',
      endpoint: '/api/track',
      status: 201,
      timestamp: Date.now() - 75000
    },
    {
      method: 'GET',
      endpoint: '/admin/api/2023-10/products.json',
      status: 200,
      timestamp: Date.now() - 45000
    },
    {
      method: 'GET',
      endpoint: '/api/lists',
      status: 429,
      timestamp: Date.now() - 25000
    }
  ]);

  // Simulate scan progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnosticTests(prevTests => {
        const updatedTests = [...prevTests];
        const currentTest = updatedTests.find(test => test.status === 'in-progress');
        
        if (currentTest) {
          currentTest.progress = Math.min(currentTest.progress + Math.random() * 15, 100);
          
          if (currentTest.progress >= 100) {
            currentTest.status = 'completed';
            currentTest.progressText = 'Completed successfully';
            
            // Start next test
            const nextTestIndex = updatedTests.findIndex(test => test.status === 'pending');
            if (nextTestIndex !== -1) {
              updatedTests[nextTestIndex].status = 'in-progress';
              updatedTests[nextTestIndex].progress = 5;
              updatedTests[nextTestIndex].progressText = 'Initializing test...';
              setActiveTestIndex(nextTestIndex);
              setCurrentStep(nextTestIndex + 1);
            }
          }
        }
        
        return updatedTests;
      });

      // Update overall progress
      setOverallProgress(prev => {
        const completedTests = diagnosticTests.filter(test => test.status === 'completed').length;
        const inProgressTests = diagnosticTests.filter(test => test.status === 'in-progress');
        const inProgressContribution = inProgressTests.reduce((sum, test) => sum + (test.progress || 0), 0);
        
        const newProgress = Math.min(
          ((completedTests * 100 + inProgressContribution) / diagnosticTests.length),
          100
        );
        
        return Math.round(newProgress);
      });

      // Update estimated time
      setEstimatedTimeRemaining(prev => Math.max(prev - 2, 0));
    }, 2000);

    // Check if scan is complete
    const completedTests = diagnosticTests.filter(test => test.status === 'completed').length;
    if (completedTests === diagnosticTests.length) {
      setScanStatus('completed');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [diagnosticTests]);

  // Auto-redirect to results after completion
  useEffect(() => {
    if (scanStatus === 'completed') {
      const timer = setTimeout(() => {
        navigate('/diagnostic-results-dashboard');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanStatus, navigate]);

  const handleCancelScan = () => {
    setScanStatus('cancelled');
    navigate('/store-url-input-test-selection');
  };

  const handleViewResults = () => {
    navigate('/diagnostic-results-dashboard');
  };

  const getCurrentTest = () => {
    return diagnosticTests.find(test => test.status === 'in-progress') || null;
  };

  const currentTest = getCurrentTest();
  if (currentTest) {
    currentTest.steps = [
      { name: 'Connecting to APIs', completed: true, active: false },
      { name: 'Fetching data samples', completed: true, active: false },
      { name: 'Running analysis', completed: false, active: true, description: 'Analyzing data patterns and configurations...' },
      { name: 'Validating results', completed: false, active: false },
      { name: 'Generating report', completed: false, active: false }
    ];
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <WorkflowProgressIndicator />
      
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 lg:mr-80">
          <div className="px-content-padding py-6">
            <ProgressHeader
              overallProgress={overallProgress}
              estimatedTimeRemaining={estimatedTimeRemaining}
              currentStep={currentStep}
              totalSteps={diagnosticTests.length}
            />

            {/* Test Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {diagnosticTests.map((test, index) => (
                <TestCard
                  key={test.id}
                  test={test}
                  isActive={test.status === 'in-progress'}
                />
              ))}
            </div>

            <ScanControls
              scanStatus={scanStatus}
              onCancelScan={handleCancelScan}
              onViewResults={handleViewResults}
              showViewResults={scanStatus === 'completed'}
              isScanning={scanStatus === 'scanning'}
            />
          </div>
        </main>

        {/* Technical Sidebar */}
        <TechnicalSidebar
          currentTest={currentTest}
          scanLogs={scanLogs}
          apiCalls={apiCalls}
        />
      </div>

      <ContextualActionBar />
    </div>
  );
};

export default DiagnosticScanProgress;