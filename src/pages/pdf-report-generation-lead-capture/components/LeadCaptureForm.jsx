import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LeadCaptureForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    marketingConsent: false,
    privacyConsent: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const roleOptions = [
    'Store Owner',
    'E-commerce Manager',
    'Marketing Manager',
    'Developer',
    'Agency Owner',
    'Consultant',
    'Other'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return value.trim().length < 2 ? 'First name must be at least 2 characters' : '';
      case 'lastName':
        return value.trim().length < 2 ? 'Last name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'company':
        return value.trim().length < 2 ? 'Company name must be at least 2 characters' : '';
      case 'role':
        return !value ? 'Please select your role' : '';
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return value && !phoneRegex.test(value.replace(/\s/g, '')) ? 'Please enter a valid phone number' : '';
      case 'privacyConsent':
        return !value ? 'You must accept the privacy policy to continue' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : '';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Get Your Detailed Report
        </h2>
        <p className="text-sm text-text-secondary">
          Enter your details to receive the comprehensive diagnostic report with technical solutions.
        </p>
      </div>

      {/* Value Proposition */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon name="Gift" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-primary mb-1">
              What You'll Receive
            </h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Detailed technical analysis of your Klaviyo integration</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Step-by-step fix instructions with code snippets</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Priority recommendations to maximize ROI</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Best practices guide for ongoing maintenance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-1">
              First Name *
            </label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter your first name"
              className={getFieldError('firstName') ? 'border-error' : ''}
              required
            />
            {getFieldError('firstName') && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{getFieldError('firstName')}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-1">
              Last Name *
            </label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter your last name"
              className={getFieldError('lastName') ? 'border-error' : ''}
              required
            />
            {getFieldError('lastName') && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{getFieldError('lastName')}</span>
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email Address *
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your email address"
            className={getFieldError('email') ? 'border-error' : ''}
            required
          />
          {getFieldError('email') && (
            <p className="mt-1 text-xs text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={12} />
              <span>{getFieldError('email')}</span>
            </p>
          )}
        </div>

        {/* Company and Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-1">
              Company Name *
            </label>
            <Input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter your company name"
              className={getFieldError('company') ? 'border-error' : ''}
              required
            />
            {getFieldError('company') && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{getFieldError('company')}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-1">
              Your Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 
                        focus:ring-primary focus:border-primary transition-micro
                        ${getFieldError('role') ? 'border-error' : 'border-border'}`}
              required
            >
              <option value="">Select your role</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {getFieldError('role') && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{getFieldError('role')}</span>
              </p>
            )}
          </div>
        </div>

        {/* Phone (Optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">
            Phone Number <span className="text-text-muted">(Optional)</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your phone number"
            className={getFieldError('phone') ? 'border-error' : ''}
          />
          {getFieldError('phone') && (
            <p className="mt-1 text-xs text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={12} />
              <span>{getFieldError('phone')}</span>
            </p>
          )}
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="privacyConsent"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                required
              />
            </div>
            <label htmlFor="privacyConsent" className="text-sm text-text-secondary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}*
            </label>
          </div>
          {getFieldError('privacyConsent') && (
            <p className="text-xs text-error flex items-center space-x-1 ml-7">
              <Icon name="AlertCircle" size={12} />
              <span>{getFieldError('privacyConsent')}</span>
            </p>
          )}

          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="marketingConsent"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
            </div>
            <label htmlFor="marketingConsent" className="text-sm text-text-secondary">
              I'd like to receive helpful tips and updates about Klaviyo optimization
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            iconName="Download"
            iconPosition="left"
          >
            {isSubmitting ? 'Generating Report...' : 'Generate & Download Report'}
          </Button>
        </div>
      </form>

      {/* Trust Signals */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs text-text-muted">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>Data Protected</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>Shopify Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureForm;