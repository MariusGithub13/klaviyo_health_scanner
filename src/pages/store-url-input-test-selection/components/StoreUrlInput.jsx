import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const StoreUrlInput = ({ onUrlChange, onValidationChange }) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationState, setValidationState] = useState('idle'); // idle, validating, valid, invalid
  const [errorMessage, setErrorMessage] = useState('');

  const validateShopifyUrl = async (inputUrl) => {
    if (!inputUrl.trim()) {
      setValidationState('idle');
      setErrorMessage('');
      return false;
    }

    setIsValidating(true);
    setValidationState('validating');

    // Simulate API validation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic URL validation
    const urlPattern = /^https?:\/\/.+\.myshopify\.com\/?$/i;
    const isValidFormat = urlPattern.test(inputUrl.trim());

    if (!isValidFormat) {
      setValidationState('invalid');
      setErrorMessage('Please enter a valid Shopify store URL (e.g., https://your-store.myshopify.com)');
      setIsValidating(false);
      return false;
    }

    // Mock store accessibility check
    const mockStoreExists = !inputUrl.includes('invalid') && !inputUrl.includes('test-fail');
    
    if (!mockStoreExists) {
      setValidationState('invalid');
      setErrorMessage('Store not found or not accessible. Please check the URL and try again.');
      setIsValidating(false);
      return false;
    }

    setValidationState('valid');
    setErrorMessage('');
    setIsValidating(false);
    return true;
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    onUrlChange(newUrl);
    
    // Reset validation state when user types
    if (validationState !== 'idle') {
      setValidationState('idle');
      setErrorMessage('');
    }
  };

  const handleUrlBlur = () => {
    if (url.trim()) {
      validateShopifyUrl(url);
    }
  };

  useEffect(() => {
    onValidationChange(validationState === 'valid');
  }, [validationState, onValidationChange]);

  const getInputIcon = () => {
    switch (validationState) {
      case 'validating':
        return <Icon name="Loader2" size={20} className="text-accent animate-spin" />;
      case 'valid':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'invalid':
        return <Icon name="AlertCircle" size={20} className="text-error" />;
      default:
        return <Icon name="Store" size={20} className="text-text-muted" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
          1
        </div>
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Enter Your Shopify Store URL
        </h2>
      </div>
      
      <div className="relative">
        <div className="relative">
          <Input
            type="url"
            placeholder="https://your-store.myshopify.com"
            value={url}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            className={`pl-12 pr-12 py-4 text-lg ${
              validationState === 'valid' ? 'border-success focus:ring-success' :
              validationState === 'invalid'? 'border-error focus:ring-error' : 'border-border focus:ring-primary'
            }`}
            disabled={isValidating}
          />
          
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Globe" size={20} className="text-text-muted" />
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {getInputIcon()}
          </div>
        </div>
        
        {validationState === 'invalid' && errorMessage && (
          <div className="mt-2 flex items-center space-x-2 text-error text-sm">
            <Icon name="AlertTriangle" size={16} />
            <span>{errorMessage}</span>
          </div>
        )}
        
        {validationState === 'valid' && (
          <div className="mt-2 flex items-center space-x-2 text-success text-sm">
            <Icon name="CheckCircle" size={16} />
            <span>Store URL validated successfully</span>
          </div>
        )}
        
        {validationState === 'validating' && (
          <div className="mt-2 flex items-center space-x-2 text-accent text-sm">
            <Icon name="Loader2" size={16} className="animate-spin" />
            <span>Validating store URL...</span>
          </div>
        )}
      </div>
      
      <p className="mt-3 text-sm text-text-secondary">
        We'll connect to your Shopify store to analyze your Klaviyo integration. Your store data remains secure and private.
      </p>
    </div>
  );
};

export default StoreUrlInput;