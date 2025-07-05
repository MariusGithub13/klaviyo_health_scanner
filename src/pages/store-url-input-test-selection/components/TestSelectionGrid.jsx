import React from 'react';
import DiagnosticTestCard from './DiagnosticTestCard';
import Icon from '../../../components/AppIcon';

const TestSelectionGrid = ({ selectedTests, onTestToggle }) => {
  const diagnosticTests = [
    {
      id: 'purchase-tracking',
      title: 'Purchase Event Tracking',
      icon: 'ShoppingCart',
      severity: 'critical',
      description: 'Verify that purchase events are properly tracked and sent to Klaviyo with correct data structure.',
      detailedDescription: 'This test analyzes your checkout process to ensure purchase events are correctly captured and transmitted to Klaviyo. Missing or malformed purchase data can break your email automation flows and revenue tracking.',
      estimatedTime: '2-3 min',
      impact: 'Revenue tracking, abandoned cart flows',
      checkpoints: [
        'Purchase event firing on checkout completion',
        'Order value and currency formatting',
        'Product details and SKU tracking',
        'Customer identification mapping'
      ]
    },
    {
      id: 'currency-formatting',
      title: 'Currency Formatting',
      icon: 'DollarSign',
      severity: 'high',
      description: 'Check currency formatting consistency between Shopify and Klaviyo for accurate revenue reporting.',
      detailedDescription: 'Ensures that monetary values are formatted consistently across both platforms. Inconsistent currency formatting can lead to incorrect revenue calculations and broken price-based segmentation.',
      estimatedTime: '1-2 min',
      impact: 'Revenue reporting, price-based segments',
      checkpoints: [
        'Currency symbol and code consistency',
        'Decimal place formatting',
        'Multi-currency store handling',
        'Price display in email templates'
      ]
    },
    {
      id: 'utm-parameters',
      title: 'UTM Parameter Tracking',
      icon: 'Link',
      severity: 'medium',
      description: 'Validate UTM parameter capture and attribution for marketing campaign tracking.',
      detailedDescription: 'Verifies that UTM parameters from your marketing campaigns are properly captured and attributed to customer profiles in Klaviyo. This is crucial for measuring campaign effectiveness and ROI.',
      estimatedTime: '1-2 min',
      impact: 'Campaign attribution, marketing ROI',
      checkpoints: [
        'UTM parameter capture on landing',
        'Attribution to customer profiles',
        'Campaign source tracking',
        'Marketing channel identification'
      ]
    },
    {
      id: 'double-optin',
      title: 'Double Opt-in Conflicts',
      icon: 'UserCheck',
      severity: 'high',
      description: 'Identify conflicts between Shopify and Klaviyo double opt-in settings that may block subscribers.',
      detailedDescription: 'Analyzes your email subscription flow to detect conflicts between Shopify and Klaviyo opt-in settings. Misaligned settings can prevent customers from receiving marketing emails even after subscribing.',
      estimatedTime: '2-3 min',
      impact: 'Email deliverability, subscriber growth',
      checkpoints: [
        'Shopify newsletter subscription settings',
        'Klaviyo double opt-in configuration',
        'Subscription confirmation flow',
        'Email consent tracking'
      ]
    },
    {
      id: 'product-sync',
      title: 'Product Catalog Sync',
      icon: 'Package',
      severity: 'medium',
      description: 'Ensure product catalog data is synchronized correctly between Shopify and Klaviyo.',
      detailedDescription: 'Checks that your product information, including titles, descriptions, images, and inventory status, is accurately synchronized between Shopify and Klaviyo for personalized email content.',
      estimatedTime: '3-4 min',
      impact: 'Product recommendations, inventory emails',
      checkpoints: [
        'Product title and description sync',
        'Product image URL accuracy',
        'Inventory status updates',
        'Product variant handling'
      ]
    },
    {
      id: 'duplicate-profiles',
      title: 'Duplicate Profile Detection',
      icon: 'Users',
      severity: 'critical',
      description: 'Scan for duplicate customer profiles that can cause data fragmentation and delivery issues.',
      detailedDescription: 'Identifies duplicate customer profiles in Klaviyo that can fragment customer data and cause email delivery problems. Duplicate profiles often result from inconsistent customer identification methods.',
      estimatedTime: '2-3 min',
      impact: 'Data accuracy, email deliverability',
      checkpoints: [
        'Email address duplication',
        'Customer ID consistency',
        'Profile merging opportunities',
        'Data fragmentation analysis'
      ]
    },
    {
      id: 'gdpr-consent',
      title: 'GDPR Consent Mapping',
      icon: 'Shield',
      severity: 'high',
      description: 'Verify GDPR consent preferences are properly mapped and respected across both platforms.',
      detailedDescription: 'Ensures that customer consent preferences for marketing communications are properly synchronized and respected between Shopify and Klaviyo, maintaining GDPR compliance.',
      estimatedTime: '2-3 min',
      impact: 'Legal compliance, customer trust',
      checkpoints: [
        'Consent preference synchronization',
        'Opt-out request handling',
        'Marketing permission tracking',
        'Data processing compliance'
      ]
    }
  ];

  const handleSelectAll = () => {
    const allTestIds = diagnosticTests.map(test => test.id);
    const allSelected = allTestIds.every(id => selectedTests.includes(id));
    
    if (allSelected) {
      // Deselect all
      allTestIds.forEach(id => {
        if (selectedTests.includes(id)) {
          onTestToggle(id);
        }
      });
    } else {
      // Select all
      allTestIds.forEach(id => {
        if (!selectedTests.includes(id)) {
          onTestToggle(id);
        }
      });
    }
  };

  const allSelected = diagnosticTests.every(test => selectedTests.includes(test.id));
  const someSelected = selectedTests.length > 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
            2
          </div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Select Diagnostic Tests
          </h2>
        </div>
        
        <button
          onClick={handleSelectAll}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-lg transition-micro"
        >
          <Icon name={allSelected ? "Square" : "CheckSquare"} size={16} />
          <span>{allSelected ? 'Deselect All' : 'Select All'}</span>
        </button>
      </div>

      {/* Selection Summary */}
      {someSelected && (
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">
              {selectedTests.length} test{selectedTests.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <p className="text-sm text-primary-700 mt-1">
            Estimated scan time: {Math.ceil(selectedTests.length * 2.5)} minutes
          </p>
        </div>
      )}

      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagnosticTests.map((test) => (
          <DiagnosticTestCard
            key={test.id}
            test={test}
            isSelected={selectedTests.includes(test.id)}
            onToggle={onTestToggle}
          />
        ))}
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">
              Recommendation
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              For comprehensive analysis, we recommend running all tests. Critical and high-priority tests 
              address the most common issues that impact revenue and customer experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSelectionGrid;