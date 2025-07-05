import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import WorkflowProgressIndicator from '../../components/ui/WorkflowProgressIndicator';
import TechnicalSidebar from '../../components/ui/TechnicalSidebar';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import ProgressSidebar from './components/ProgressSidebar';
import FixInstructionPanel from './components/FixInstructionPanel';

import Button from '../../components/ui/Button';

const TechnicalFixInstructions = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issues, setIssues] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Mock technical issues data
  const mockIssues = [
    {
      id: 'api-key-invalid',
      title: 'Invalid API Key Configuration',
      description: 'Klaviyo API key is either missing, incorrect, or has insufficient permissions causing authentication failures.',
      severity: 'high',
      estimatedTime: '15-30 min',
      difficulty: 'Easy',
      requiredSkills: 'Basic API configuration',
      completed: false,
      problemDescription: `The Klaviyo API key configured in your Shopify store is either invalid, expired, or lacks the necessary permissions to perform required operations. This results in failed API calls and broken data synchronization between your store and Klaviyo.`,
      rootCause: `This issue typically occurs when:\n• The API key was copied incorrectly during setup\n• The API key has been regenerated in Klaviyo but not updated in Shopify\n• The API key lacks required permissions (Read/Write access to Lists, Profiles, Events)\n• The API key belongs to a different Klaviyo account`,
      steps: [
        {
          title: 'Verify Current API Key',
          description: 'First, check your current API key configuration in Shopify admin.',
          code: `// Navigate to Shopify Admin > Apps > Klaviyo
// Check the API Key field in settings
// Current key format should be: pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
          language: 'javascript',
          codeTitle: 'Current API Key Location',
          note: 'API keys starting with "pk_" are public keys, "sk_" are secret keys. Ensure you\'re using the correct type.'
        },
        {
          title: 'Generate New API Key in Klaviyo',
          description: 'Log into your Klaviyo account and generate a new API key with proper permissions.',
          code: `1. Log into Klaviyo account
2. Navigate to Account > Settings > API Keys
3. Click "Create Private API Key"
4. Set permissions:
   - Lists: Read, Write
   - Profiles: Read, Write  
   - Events: Read, Write
   - Campaigns: Read (optional)
5. Copy the generated key`,
          language: 'text',
          codeTitle: 'Klaviyo API Key Generation Steps'
        },
        {
          title: 'Update API Key in Shopify',
          description: 'Replace the old API key with the new one in your Shopify Klaviyo app settings.',
          code: `// In Shopify Admin:
// 1. Go to Apps > Klaviyo > Settings
// 2. Paste new API key in "Private API Key" field // 3. Click"Save Settings" // 4. Test connection by clicking"Test API Connection"`,
          language: 'javascript',
          codeTitle: 'Shopify API Key Update Process'
        },
        {
          title: 'Verify API Connection',
          description: 'Test the API connection to ensure the new key is working properly.',
          code: `// Test API call to verify connection
fetch('https://a.klaviyo.com/api/profiles/', {
  method: 'GET',
  headers: {
    'Authorization': 'Klaviyo-API-Key YOUR_NEW_API_KEY',
    'revision': '2023-12-15'
  }
})
.then(response => {
  if (response.ok) {
    console.log('API connection successful');
  } else {
    console.error('API connection failed:', response.status);
  }
});`,
          language: 'javascript',
          codeTitle: 'API Connection Test',
          note: 'A successful response (200 status) indicates the API key is working correctly.'
        }
      ],
      beforeAfter: {
        language: 'javascript',
        before: `// Incorrect API key configuration
const klaviyoApiKey = 'pk_old_invalid_key_12345';

// This will fail with 401 Unauthorized
fetch('https://a.klaviyo.com/api/profiles/', {
  headers: {
    'Authorization': 'Klaviyo-API-Key ' + klaviyoApiKey
  }
});`,
        after: `// Correct API key configuration  
const klaviyoApiKey = 'pk_live_ABCDEF1234567890ABCDEF1234567890';

// This will succeed with proper authentication
fetch('https://a.klaviyo.com/api/profiles/', {
  headers: {
    'Authorization': 'Klaviyo-API-Key ' + klaviyoApiKey,
    'revision': '2023-12-15'
  }
});`
      },
      testing: 'After updating the API key, test the integration by triggering a test event from your Shopify store and verifying it appears in your Klaviyo account within 5-10 minutes.',
      testingSteps: [
        'Place a test order in your Shopify store',
        'Check Klaviyo Activity Feed for the order event',
        'Verify customer profile was created/updated',
        'Confirm all order details are accurately captured'
      ],
      resources: [
        {
          title: 'Klaviyo API Key Documentation',
          url: 'https://developers.klaviyo.com/en/docs/retrieve_api_credentials'
        },
        {
          title: 'Shopify-Klaviyo Integration Guide',
          url: 'https://help.klaviyo.com/hc/en-us/articles/115005255808'
        }
      ]
    },
    {
      id: 'webhook-config',
      title: 'Webhook Configuration Issues',
      description: 'Shopify webhooks are not properly configured or are failing to deliver events to Klaviyo endpoints.',
      severity: 'medium',
      estimatedTime: '20-45 min',
      difficulty: 'Medium',
      requiredSkills: 'Webhook configuration, API debugging',
      completed: true,
      problemDescription: `Webhooks are HTTP callbacks that Shopify sends to Klaviyo when specific events occur in your store. When webhooks are misconfigured or failing, real-time data synchronization breaks down, leading to delayed or missing customer data, order information, and behavioral tracking.`,
      rootCause: `Common webhook issues include:\n• Incorrect webhook URLs pointing to wrong endpoints\n• Missing or invalid authentication headers\n• Webhook delivery failures due to network issues\n• Klaviyo endpoint changes not reflected in Shopify settings\n• Rate limiting causing webhook rejections`,
      steps: [
        {
          title: 'Audit Current Webhook Configuration',
          description: 'Review all active webhooks in your Shopify admin to identify issues.',
          code: `// Check webhooks in Shopify Admin
// Navigate to: Settings > Notifications > Webhooks
// Look for Klaviyo-related webhooks:
// - orders/create
// - orders/updated  
// - customers/create
// - customers/updated
// - app/uninstalled`,
          language: 'text',
          codeTitle: 'Webhook Audit Checklist'
        },
        {
          title: 'Verify Webhook URLs',
          description: 'Ensure webhook URLs are pointing to correct Klaviyo endpoints.',
          code: `// Correct Klaviyo webhook URLs:
const webhookEndpoints = {
  'orders/create': 'https://a.klaviyo.com/api/webhook/integration/shopify/',
  'orders/updated': 'https://a.klaviyo.com/api/webhook/integration/shopify/',
  'customers/create': 'https://a.klaviyo.com/api/webhook/integration/shopify/',
  'customers/updated': 'https://a.klaviyo.com/api/webhook/integration/shopify/'
};

// Verify each webhook URL matches the correct endpoint`,
          language: 'javascript',
          codeTitle: 'Correct Webhook Endpoints'
        },
        {
          title: 'Test Webhook Delivery',
          description: 'Manually test webhook delivery to ensure they are working properly.',
          code: `// Test webhook delivery using Shopify Admin API
curl -X POST "https://your-shop.myshopify.com/admin/api/2023-10/webhooks.json" \\
  -H "X-Shopify-Access-Token: YOUR_ACCESS_TOKEN"\ -H"Content-Type: application/json" \\
  -d '{
    "webhook": {
      "topic": "orders/create",
      "address": "https://a.klaviyo.com/api/webhook/integration/shopify/",
      "format": "json"
    }
  }'`,
          language: 'bash',
          codeTitle: 'Webhook Delivery Test'
        }
      ],
      testing: 'Create a test order and monitor webhook delivery logs in both Shopify and Klaviyo to ensure events are being transmitted successfully.',
      resources: [
        {
          title: 'Shopify Webhook Documentation',
          url: 'https://shopify.dev/docs/admin-api/rest/reference/events/webhook'
        }
      ]
    },
    {
      id: 'cors-policy',
      title: 'CORS Policy Violations',
      description: 'Cross-Origin Resource Sharing (CORS) policies are blocking API requests between your store and Klaviyo.',
      severity: 'high',
      estimatedTime: '30-60 min',
      difficulty: 'Hard',
      requiredSkills: 'Advanced web development, CORS configuration',
      completed: false,
      problemDescription: `CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that blocks requests from one domain to another unless explicitly allowed. When CORS policies are not properly configured, browser-based API calls to Klaviyo from your Shopify store will be blocked, preventing proper integration functionality.`,
      rootCause: `CORS issues typically arise from:\n• Missing or incorrect CORS headers in API responses\n• Klaviyo API endpoints not allowing requests from your domain\n• Browser security policies blocking cross-origin requests\n• Incorrect implementation of preflight requests for complex HTTP methods`,
      steps: [
        {
          title: 'Identify CORS Errors',
          description: 'Check browser console for CORS-related error messages.',
          code: `// Common CORS error messages in browser console:
// "Access to fetch at 'https://a.klaviyo.com/api/...' from origin 'https://your-store.myshopify.com' has been blocked by CORS policy"
// "Response to preflight request doesn't pass access control check"

// Open browser DevTools > Console to see these errors`,
          language: 'javascript',
          codeTitle: 'CORS Error Detection'
        },
        {
          title: 'Implement Server-Side Proxy',
          description: 'Create a server-side proxy to handle API calls and avoid CORS issues.',
          code: `// Server-side proxy implementation (Node.js/Express)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['https://your-store.myshopify.com'],
  credentials: true
}));

app.post('/api/klaviyo-proxy', async (req, res) => {
  try {
    const response = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': 'Klaviyo-API-Key ' + process.env.KLAVIYO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
          language: 'javascript',
          codeTitle: 'Server-Side Proxy Solution'
        }
      ],
      testing: 'Test API calls through the proxy endpoint and verify that CORS errors no longer appear in the browser console.',
      resources: [
        {
          title: 'MDN CORS Documentation',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS'
        }
      ]
    },
    {
      id: 'pixel-installation',
      title: 'Klaviyo Pixel Installation',
      description: 'The Klaviyo tracking pixel is not properly installed or configured on your Shopify store.',
      severity: 'high',
      estimatedTime: '10-20 min',
      difficulty: 'Easy',
      requiredSkills: 'Basic HTML/JavaScript',
      completed: false,
      problemDescription: `The Klaviyo tracking pixel is essential for capturing visitor behavior, page views, and conversion events on your Shopify store. Without proper pixel installation, you'll miss crucial customer journey data and be unable to create effective behavioral segments and automated flows.`,
      rootCause: `Pixel installation issues occur when:\n• The pixel code is missing from your theme\n• The pixel is installed but not firing properly\n• Multiple conflicting pixels are installed\n• The pixel is blocked by ad blockers or privacy settings`,
      steps: [
        {
          title: 'Locate Klaviyo Pixel Code',description: 'Find your unique Klaviyo pixel code in your account settings.',
          code: `// Navigate to Klaviyo Account > Settings > API Keys
// Copy the "Site ID" (6-character code)
// Your pixel code will look like this:

<script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=YOUR_SITE_ID"></script>`,
          language: 'html',codeTitle: 'Klaviyo Pixel Code Structure'
        },
        {
          title: 'Install Pixel in Shopify Theme',description: 'Add the pixel code to your theme\'s header section.',
          code: `<!-- Add this code to theme.liquid before closing </head> tag -->
<script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=ABCDEF"></script>

<!-- Initialize Klaviyo tracking -->
<script type="text/javascript">
  var _learnq = _learnq || [];
  _learnq.push(['account', 'ABCDEF']);
</script>`,
          language: 'html',
          codeTitle: 'Theme Installation Code'
        },
        {
          title: 'Verify Pixel Installation',
          description: 'Test that the pixel is loading and firing correctly.',
          code: `// Test pixel installation in browser console
// 1. Open your store in browser
// 2. Open DevTools > Console  
// 3. Type: _learnq
// 4. Should return array with tracking data

// Also check Network tab for klaviyo.js requests`,
          language: 'javascript',
          codeTitle: 'Pixel Verification Test'
        }
      ],
      testing: 'Visit your store and use browser developer tools to confirm the Klaviyo pixel is loading and sending tracking events.',
      resources: [
        {
          title: 'Klaviyo Pixel Installation Guide',
          url: 'https://help.klaviyo.com/hc/en-us/articles/115005255808'
        }
      ]
    },
    {
      id: 'event-tracking',
      title: 'Event Tracking Configuration',
      description: 'Custom events and behavioral tracking are not properly configured or firing consistently.',
      severity: 'medium',
      estimatedTime: '45-90 min',
      difficulty: 'Medium',
      requiredSkills: 'JavaScript, Event tracking',
      completed: true,
      problemDescription: `Event tracking allows you to capture specific customer actions and behaviors on your store. When events aren't properly configured, you lose valuable data for segmentation, personalization, and automation triggers.`,
      rootCause: `Event tracking issues stem from:\n• Missing or incorrect event implementation code\n• Events firing at wrong times or with incorrect data\n• Duplicate event tracking causing data pollution\n• Events not being properly formatted for Klaviyo API`,
      steps: [
        {
          title: 'Audit Current Event Tracking',
          description: 'Review what events are currently being tracked and identify gaps.',
          code: `// Common e-commerce events to track:
const requiredEvents = [
  'Viewed Product',
  'Added to Cart', 
  'Started Checkout',
  'Placed Order',
  'Viewed Category',
  'Searched Site'
];

// Check Klaviyo Activity Feed to see which events are firing`,
          language: 'javascript',
          codeTitle: 'Event Tracking Audit'
        }
      ],
      testing: 'Perform various actions on your store and verify events appear in Klaviyo Activity Feed with correct data.',
      resources: []
    },
    {
      id: 'customer-sync',
      title: 'Customer Data Synchronization',
      description: 'Customer profiles and data are not syncing properly between Shopify and Klaviyo.',
      severity: 'medium',
      estimatedTime: '30-60 min',
      difficulty: 'Medium',
      requiredSkills: 'API integration, Data mapping',
      completed: true,
      problemDescription: `Customer data synchronization ensures that customer profiles, preferences, and behavioral data are consistent between your Shopify store and Klaviyo. When sync fails, you may have incomplete customer profiles, missing purchase history, or outdated contact information.`,
      rootCause: `Sync issues occur due to:\n• API rate limiting preventing data updates\n• Mismatched customer identifiers between platforms\n• Data format incompatibilities\n• Network connectivity issues during sync operations`,
      steps: [
        {
          title: 'Check Sync Status',
          description: 'Verify the current state of customer data synchronization.',
          code: `// Check sync status in Klaviyo
// Navigate to: Integrations > Shopify > Sync Status
// Look for any error messages or failed sync operations

// Common sync issues:
// - "Rate limit exceeded" // -"Customer not found" // -"Invalid email format"`,
          language: 'text',
          codeTitle: 'Sync Status Check'
        }
      ],
      testing: 'Create a test customer in Shopify and verify the profile appears in Klaviyo with all expected data fields.',
      resources: []
    }
  ];

  useEffect(() => {
    setIssues(mockIssues);
    // Auto-select first high priority issue
    const firstHighPriority = mockIssues.find(issue => issue.severity === 'high' && !issue.completed);
    if (firstHighPriority) {
      setSelectedIssue(firstHighPriority);
    }
  }, []);

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setIsMobileSidebarOpen(false);
  };

  const handleToggleComplete = (issueId) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId
          ? { ...issue, completed: !issue.completed }
          : issue
      )
    );
  };

  const handleMarkSelectedComplete = () => {
    if (selectedIssue) {
      handleToggleComplete(selectedIssue.id);
      setSelectedIssue(prev => prev ? { ...prev, completed: !prev.completed } : null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <WorkflowProgressIndicator />
      <TechnicalSidebar />
      
      <div className="pt-header-height">
        <BreadcrumbNavigation selectedIssue={selectedIssue} />
        
        <div className="flex h-[calc(100vh-theme(spacing.header-height)-60px)]">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden fixed top-[calc(theme(spacing.header-height)+60px)] left-4 z-50">
            <Button
              variant="primary"
              iconName="Menu"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="shadow-card"
            >
              Issues
            </Button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" 
                 onClick={() => setIsMobileSidebarOpen(false)}>
              <div className="fixed left-0 top-0 h-full w-80 bg-surface shadow-xl"
                   onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-lg text-text-primary">
                    Technical Issues
                  </h2>
                  <Button
                    variant="ghost"
                    iconName="X"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    size="sm"
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <ProgressSidebar
                    issues={issues}
                    selectedIssue={selectedIssue}
                    onSelectIssue={handleSelectIssue}
                    onToggleComplete={handleToggleComplete}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProgressSidebar
              issues={issues}
              selectedIssue={selectedIssue}
              onSelectIssue={handleSelectIssue}
              onToggleComplete={handleToggleComplete}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            <FixInstructionPanel
              issue={selectedIssue}
              onMarkComplete={handleMarkSelectedComplete}
            />
          </div>
        </div>
      </div>

      <ContextualActionBar />
    </div>
  );
};

export default TechnicalFixInstructions;