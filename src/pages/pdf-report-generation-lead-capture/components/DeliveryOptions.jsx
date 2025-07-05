import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const DeliveryOptions = ({ onDeliveryMethodChange, selectedMethod, userEmail }) => {
  const [customEmail, setCustomEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const deliveryMethods = [
    {
      id: 'download',
      title: 'Instant Download',
      description: 'Download the PDF report immediately to your device',
      icon: 'Download',
      recommended: true,
      features: [
        'Immediate access',
        'No email required',
        'Offline viewing'
      ]
    },
    {
      id: 'email',
      title: 'Email Delivery',
      description: 'Receive the report via email for easy sharing',
      icon: 'Mail',
      recommended: false,
      features: [
        'Easy sharing',
        'Email backup',
        'Mobile friendly'
      ]
    },
    {
      id: 'both',
      title: 'Download + Email',
      description: 'Get instant access and email backup',
      icon: 'Zap',
      recommended: false,
      features: [
        'Best of both',
        'Instant + backup',
        'Maximum convenience'
      ]
    }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setCustomEmail(email);
    
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleMethodSelect = (methodId) => {
    onDeliveryMethodChange(methodId, methodId === 'email' ? customEmail : userEmail);
  };

  const needsEmailInput = selectedMethod === 'email' || selectedMethod === 'both';
  const showCustomEmailInput = needsEmailInput && !userEmail;

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Delivery Options
        </h2>
        <p className="text-sm text-text-secondary">
          Choose how you'd like to receive your diagnostic report
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {deliveryMethods.map((method) => (
          <div
            key={method.id}
            className={`
              relative border-2 rounded-lg p-4 cursor-pointer transition-micro
              ${selectedMethod === method.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
              }
            `}
            onClick={() => handleMethodSelect(method.id)}
          >
            {method.recommended && (
              <div className="absolute -top-2 left-4">
                <span className="bg-success text-white text-xs px-2 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${selectedMethod === method.id
                    ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                  }
                `}>
                  <Icon name={method.icon} size={20} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`
                    font-medium
                    ${selectedMethod === method.id ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {method.title}
                  </h3>
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${selectedMethod === method.id
                      ? 'border-primary bg-primary' :'border-secondary-300'
                    }
                  `}>
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">
                  {method.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {method.features.map((feature, index) => (
                    <span
                      key={index}
                      className={`
                        text-xs px-2 py-1 rounded-full
                        ${selectedMethod === method.id
                          ? 'bg-primary-100 text-primary' :'bg-secondary-100 text-text-secondary'
                        }
                      `}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Email Input */}
      {showCustomEmailInput && (
        <div className="mb-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Mail" size={16} className="text-accent" />
            <h3 className="font-medium text-accent">Email Address Required</h3>
          </div>
          
          <div>
            <label htmlFor="customEmail" className="block text-sm font-medium text-text-primary mb-1">
              Email Address
            </label>
            <Input
              type="email"
              id="customEmail"
              value={customEmail}
              onChange={handleEmailChange}
              placeholder="Enter email address for delivery"
              className={emailError ? 'border-error' : ''}
            />
            {emailError && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{emailError}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Email Preview */}
      {needsEmailInput && (userEmail || (customEmail && !emailError)) && (
        <div className="mb-6 p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <h3 className="font-medium text-success">Email Delivery Confirmed</h3>
          </div>
          <p className="text-sm text-text-secondary">
            Report will be sent to:{' '}
            <span className="font-medium text-text-primary">
              {userEmail || customEmail}
            </span>
          </p>
        </div>
      )}

      {/* Delivery Timeline */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <h3 className="font-medium text-text-primary mb-3">
          Delivery Timeline
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm text-text-secondary">
              <strong>Download:</strong> Immediate (after generation)
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-sm text-text-secondary">
              <strong>Email:</strong> Within 2-3 minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;