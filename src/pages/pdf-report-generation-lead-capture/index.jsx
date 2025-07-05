import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ReportPreview from './components/ReportPreview';
import LeadCaptureForm from './components/LeadCaptureForm';
import GenerationProgress from './components/GenerationProgress';
import DeliveryOptions from './components/DeliveryOptions';
import Icon from '../../components/AppIcon';


const PDFReportGenerationLeadCapture = () => {
  const navigate = useNavigate();
  
  // Form and generation states
  const [selectedSections, setSelectedSections] = useState([
    'executive-summary',
    'detailed-findings',
    'technical-details',
    'fix-instructions'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('analyzing');
  const [estimatedTime, setEstimatedTime] = useState('30-45 seconds');
  const [deliveryMethod, setDeliveryMethod] = useState('download');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [leadData, setLeadData] = useState(null);

  // Mock diagnostic data
  const mockDiagnosticData = {
    storeUrl: 'mystore.myshopify.com',
    scanDate: new Date().toISOString(),
    overallScore: 72,
    totalIssues: 5,
    criticalIssues: 2,
    warnings: 3,
    tests: [
      {
        id: 'purchase-tracking',
        name: 'Purchase Event Tracking',
        status: 'failed',
        severity: 'critical',
        description: 'Purchase events are not being tracked properly'
      },
      {
        id: 'currency-formatting',
        name: 'Currency Formatting',
        status: 'warning',
        severity: 'medium',
        description: 'Currency values may not display correctly'
      },
      {
        id: 'utm-parameters',
        name: 'UTM Parameter Tracking',
        status: 'passed',
        severity: 'low',
        description: 'UTM parameters are being tracked correctly'
      }
    ]
  };

  // Handle section toggle for report customization
  const handleSectionToggle = (sectionId) => {
    setSelectedSections(prev => {
      if (prev.includes(sectionId)) {
        return prev.filter(id => id !== sectionId);
      } else {
        return [...prev, sectionId];
      }
    });
  };

  // Handle delivery method change
  const handleDeliveryMethodChange = (method, email) => {
    setDeliveryMethod(method);
    setDeliveryEmail(email);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setLeadData(formData);
    
    try {
      // Simulate API call to save lead data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start report generation
      startReportGeneration(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  // Start report generation process
  const startReportGeneration = (formData) => {
    setIsSubmitting(false);
    setIsGenerating(true);
    setGenerationProgress(0);
    setCurrentStep('analyzing');
    
    // Simulate generation process
    const steps = [
      { step: 'analyzing', duration: 8000, progress: 25 },
      { step: 'formatting', duration: 10000, progress: 50 },
      { step: 'generating', duration: 12000, progress: 80 },
      { step: 'finalizing', duration: 5000, progress: 100 }
    ];

    let currentStepIndex = 0;
    
    const processStep = () => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setCurrentStep(step.step);
        
        // Update estimated time
        const remainingTime = Math.max(35 - (currentStepIndex * 8), 5);
        setEstimatedTime(`${remainingTime} seconds`);
        
        // Animate progress
        const progressInterval = setInterval(() => {
          setGenerationProgress(prev => {
            const increment = step.progress / (step.duration / 100);
            const newProgress = Math.min(prev + increment, step.progress);
            
            if (newProgress >= step.progress) {
              clearInterval(progressInterval);
              currentStepIndex++;
              setTimeout(processStep, 500);
            }
            
            return newProgress;
          });
        }, 100);
      } else {
        // Generation complete
        setTimeout(() => {
          completeGeneration(formData);
        }, 1000);
      }
    };
    
    processStep();
  };

  // Complete generation and handle download/email
  const completeGeneration = (formData) => {
    setIsGenerating(false);
    
    // Simulate file download
    if (deliveryMethod === 'download' || deliveryMethod === 'both') {
      const blob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `klaviyo-diagnostic-report-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    
    // Show success message
    alert('Report generated successfully! Check your downloads folder.');
    
    // Navigate back to results
    setTimeout(() => {
      navigate('/diagnostic-results-dashboard');
    }, 2000);
  };

  // Handle generation cancellation
  const handleCancelGeneration = () => {
    setIsGenerating(false);
    setGenerationProgress(0);
    setCurrentStep('analyzing');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <WorkflowProgressIndicator />
      
      <main className="pt-header-height">
        <div className="px-content-padding py-8">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Generate Your Diagnostic Report
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Customize and download your comprehensive Klaviyo integration analysis with 
                detailed technical solutions and implementation guidance.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-surface rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockDiagnosticData.overallScore}%
                </div>
                <div className="text-xs text-text-secondary">Health Score</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg border border-border">
                <div className="text-2xl font-bold text-error mb-1">
                  {mockDiagnosticData.criticalIssues}
                </div>
                <div className="text-xs text-text-secondary">Critical Issues</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg border border-border">
                <div className="text-2xl font-bold text-warning mb-1">
                  {mockDiagnosticData.warnings}
                </div>
                <div className="text-xs text-text-secondary">Warnings</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg border border-border">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {selectedSections.length}
                </div>
                <div className="text-xs text-text-secondary">Report Sections</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Report Preview */}
              <div className="space-y-6">
                <ReportPreview
                  reportData={mockDiagnosticData}
                  selectedSections={selectedSections}
                  onSectionToggle={handleSectionToggle}
                />
                
                {/* Delivery Options - Mobile */}
                <div className="lg:hidden">
                  <DeliveryOptions
                    selectedMethod={deliveryMethod}
                    onDeliveryMethodChange={handleDeliveryMethodChange}
                    userEmail={leadData?.email}
                  />
                </div>
              </div>

              {/* Right Column - Lead Capture Form */}
              <div className="space-y-6">
                <LeadCaptureForm
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
                
                {/* Delivery Options - Desktop */}
                <div className="hidden lg:block">
                  <DeliveryOptions
                    selectedMethod={deliveryMethod}
                    onDeliveryMethodChange={handleDeliveryMethodChange}
                    userEmail={leadData?.email}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                What's Included in Your Report
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="BarChart3" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary">Executive Summary</h3>
                      <p className="text-sm text-text-secondary">
                        High-level overview of your integration health with key metrics and recommendations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Search" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary">Detailed Analysis</h3>
                      <p className="text-sm text-text-secondary">
                        Comprehensive breakdown of each diagnostic test with specific findings.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Code" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary">Code Snippets</h3>
                      <p className="text-sm text-text-secondary">
                        Ready-to-use code examples and configuration templates for quick fixes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Target" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary">Priority Recommendations</h3>
                      <p className="text-sm text-text-secondary">
                        Issues ranked by business impact to help you focus on what matters most.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="BookOpen" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary">Best Practices</h3>
                      <p className="text-sm text-text-secondary">
                        Industry-standard recommendations for maintaining optimal integration health.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Headphones" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary">Support Resources</h3>
                      <p className="text-sm text-text-secondary">
                        Links to documentation, support channels, and additional resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Generation Progress Modal */}
      <GenerationProgress
        isGenerating={isGenerating}
        progress={generationProgress}
        currentStep={currentStep}
        estimatedTime={estimatedTime}
        onCancel={handleCancelGeneration}
      />

      <ContextualActionBar />
    </div>
  );
};

export default PDFReportGenerationLeadCapture;