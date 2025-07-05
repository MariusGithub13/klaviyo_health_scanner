import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ResultsHeader from './components/ResultsHeader';
import SummaryMetrics from './components/SummaryMetrics';
import FilterSortControls from './components/FilterSortControls';
import ResultsGrid from './components/ResultsGrid';

const DiagnosticResultsDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('severity');

  // Mock store data
  const storeData = {
    name: "TechStyle Boutique",
    url: "techstyle-boutique.myshopify.com",
    klaviyoAccount: "TechStyle Marketing"
  };

  // Mock scan data
  const scanData = {
    date: "December 15, 2024",
    time: "2:34 PM EST",
    duration: "2m 45s",
    testsRun: 7
  };

  // Mock health score
  const healthScore = {
    overall: 42,
    breakdown: {
      tracking: 65,
      sync: 30,
      configuration: 45,
      compliance: 60
    }
  };

  // Mock summary metrics
  const summaryMetrics = {
    totalIssues: 5,
    criticalIssues: 2,
    warnings: 3,
    passedTests: 2
  };

  // Mock diagnostic test results
  const diagnosticTests = [
    {
      id: 'purchase-tracking',
      name: 'Purchase Event Tracking',
      description: 'Validates proper tracking of purchase events and revenue data',
      status: 'failed',
      severity: 'critical',
      tooltip: 'Critical for revenue attribution and customer lifecycle tracking',
      findings: `Purchase events are not being tracked properly. Missing revenue data and product details in 73% of transactions. This affects customer segmentation and revenue reporting.`,
      affectedData: [
        {
          type: 'Missing Revenue Data',
          example: 'Order #1234: $156.99 purchase tracked without revenue value'
        },
        {
          type: 'Incomplete Product Details',
          example: 'Product SKU and variant information missing from purchase events'
        }
      ],
      recommendations: [
        'Update Klaviyo tracking script to include revenue parameters',
        'Implement proper product data mapping in checkout flow',
        'Add server-side tracking as backup for client-side failures'
      ],
      codeSnippet: `// Add to checkout success page
klaviyo.track('Placed Order', {
  '$event_id': order.id,
  '$value': order.total_price,
  'OrderId': order.order_number,
  'Categories': order.line_items.map(item => item.product_type),
  'ItemNames': order.line_items.map(item => item.title)
});`
    },
    {
      id: 'currency-formatting',
      name: 'Currency Formatting',
      description: 'Ensures consistent currency formatting across all tracked events',
      status: 'warning',
      severity: 'warning',
      tooltip: 'Important for accurate revenue reporting and international stores',
      findings: `Currency values are inconsistently formatted. Some events use cents (15699) while others use dollars (156.99). This causes reporting discrepancies.`,
      affectedData: [
        {
          type: 'Inconsistent Format',
          example: 'Same order tracked as both $156.99 and 15699 cents'
        }
      ],
      recommendations: [
        'Standardize currency formatting to use decimal values',
        'Implement currency conversion for multi-currency stores'
      ],
      codeSnippet: `// Standardize currency formatting
const formatCurrency = (amount) => {
  return parseFloat(amount / 100).toFixed(2);
};`
    },
    {
      id: 'utm-parameters',
      name: 'UTM Parameter Tracking',
      description: 'Tracks marketing attribution through UTM parameters',
      status: 'failed',
      severity: 'warning',
      tooltip: 'Essential for marketing campaign attribution and ROI analysis',
      findings: `UTM parameters are not being captured in 45% of sessions. This limits marketing attribution accuracy and campaign performance analysis.`,
      affectedData: [
        {
          type: 'Missing UTM Data',
          example: 'Google Ads traffic not attributed to campaigns'
        }
      ],
      recommendations: [
        'Implement UTM parameter capture on all landing pages',
        'Store UTM data in customer profiles for attribution'
      ],
      codeSnippet: `// Capture UTM parameters
const utmParams = {
  'utm_source': getUrlParameter('utm_source'),
  'utm_medium': getUrlParameter('utm_medium'),
  'utm_campaign': getUrlParameter('utm_campaign')
};`
    },
    {
      id: 'double-optin',
      name: 'Double Opt-in Conflicts',
      description: 'Identifies conflicts between Shopify and Klaviyo opt-in settings',
      status: 'failed',
      severity: 'critical',
      tooltip: 'Critical for email deliverability and compliance',
      findings: `Double opt-in is enabled in Klaviyo but disabled in Shopify, creating subscriber sync conflicts. 23% of subscribers are not receiving confirmation emails.`,
      affectedData: [
        {
          type: 'Sync Conflicts',
          example: '156 subscribers stuck in unconfirmed state'
        }
      ],
      recommendations: [
        'Align opt-in settings between Shopify and Klaviyo',
        'Implement custom confirmation flow if needed'
      ],
      codeSnippet: `// Sync opt-in settings
const subscribeUser = (email) => {
  klaviyo.identify({
    '$email': email,
    '$consent': 'email'
  });
};`
    },
    {
      id: 'product-sync',
      name: 'Product Catalog Sync',
      description: 'Ensures product data synchronization between Shopify and Klaviyo',
      status: 'warning',
      severity: 'warning',
      tooltip: 'Important for personalized product recommendations',
      findings: `Product catalog sync is delayed by 2-4 hours. New products and inventory updates are not immediately available for email campaigns.`,
      affectedData: [
        {
          type: 'Delayed Sync',
          example: 'New product launched at 2 PM, available in Klaviyo at 6 PM'
        }
      ],
      recommendations: [
        'Enable real-time product sync webhooks',
        'Implement manual sync trigger for urgent updates'
      ],
      codeSnippet: `// Manual product sync trigger
const syncProduct = (productId) => {
  fetch('/api/klaviyo/sync-product', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId })
  });
};`
    },
    {
      id: 'duplicate-profiles',
      name: 'Duplicate Profile Detection',
      description: 'Identifies and manages duplicate customer profiles',
      status: 'passed',
      severity: 'info',
      tooltip: 'Maintains clean customer database and accurate segmentation',
      findings: `No duplicate profiles detected. Customer identification is working correctly with proper email and phone number matching.`,
      recommendations: [
        'Continue monitoring for duplicate profiles monthly',
        'Implement automated duplicate detection alerts'
      ]
    },
    {
      id: 'gdpr-consent',
      name: 'GDPR Consent Mapping',
      description: 'Validates proper consent tracking for GDPR compliance',
      status: 'passed',
      severity: 'info',
      tooltip: 'Essential for GDPR compliance and legal protection',
      findings: `GDPR consent is properly tracked and mapped. All EU customers have explicit consent recorded with timestamps.`,
      recommendations: [
        'Regular consent audit every quarter',
        'Update consent forms if privacy policy changes'
      ]
    }
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <>
      <Helmet>
        <title>Diagnostic Results - Klaviyo Health Scanner</title>
        <meta name="description" content="View comprehensive diagnostic results for your Klaviyo-Shopify integration with actionable insights and fix recommendations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <WorkflowProgressIndicator />
        
        <main className="pt-header-height">
          <ResultsHeader 
            storeData={storeData}
            scanData={scanData}
            healthScore={healthScore}
          />
          
          <SummaryMetrics metrics={summaryMetrics} />
          
          <FilterSortControls
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            activeFilters={activeFilter}
            sortBy={sortBy}
          />
          
          <ResultsGrid
            tests={diagnosticTests}
            activeFilter={activeFilter}
            sortBy={sortBy}
          />
        </main>

        <ContextualActionBar />
      </div>
    </>
  );
};

export default DiagnosticResultsDashboard;