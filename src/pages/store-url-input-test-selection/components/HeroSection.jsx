import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Icon name="Activity" size={32} className="text-primary" strokeWidth={2} />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
          Klaviyo Health Scanner
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Diagnose and fix critical Shopify-Klaviyo integration issues with automated technical auditing and actionable PDF reports.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-muted">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span>Shopify Partner</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>Real-time Analysis</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;