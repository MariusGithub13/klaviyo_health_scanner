import React, { useState } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import HeroSection from './components/HeroSection';
import StoreUrlInput from './components/StoreUrlInput';
import TestSelectionGrid from './components/TestSelectionGrid';
import StartScanButton from './components/StartScanButton';

const StoreUrlInputTestSelection = () => {
  const [storeUrl, setStoreUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);

  const handleUrlChange = (url) => {
    setStoreUrl(url);
  };

  const handleValidationChange = (isValid) => {
    setIsUrlValid(isValid);
  };

  const handleTestToggle = (testId) => {
    setSelectedTests(prev => {
      if (prev.includes(testId)) {
        return prev.filter(id => id !== testId);
      } else {
        return [...prev, testId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <WorkflowProgressIndicator />
      
      <main className="pt-header-height">
        <div className="px-content-padding py-12">
          <div className="max-w-6xl mx-auto">
            <HeroSection />
            
            <div className="max-w-4xl mx-auto">
              <StoreUrlInput
                onUrlChange={handleUrlChange}
                onValidationChange={handleValidationChange}
              />
              
              <TestSelectionGrid
                selectedTests={selectedTests}
                onTestToggle={handleTestToggle}
              />
              
              <StartScanButton
                isUrlValid={isUrlValid}
                selectedTests={selectedTests}
                storeUrl={storeUrl}
              />
            </div>
          </div>
        </div>
      </main>
      
      <ContextualActionBar />
    </div>
  );
};

export default StoreUrlInputTestSelection;