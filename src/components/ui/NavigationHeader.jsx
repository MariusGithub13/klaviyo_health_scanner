import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/store-url-input-test-selection',
      icon: 'Home',
      tooltip: 'Start new diagnostic scan'
    },
    {
      label: 'Results',
      path: '/diagnostic-results-dashboard',
      icon: 'BarChart3',
      tooltip: 'View diagnostic results'
    },
    {
      label: 'Technical Docs',
      path: '/technical-fix-instructions',
      icon: 'FileText',
      tooltip: 'Implementation guidance'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
      <div className="px-content-padding">
        <div className="flex items-center justify-between h-header-height">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer transition-micro hover:opacity-80"
            onClick={() => handleNavigation('/store-url-input-test-selection')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg text-text-primary leading-tight">
                  Klaviyo Health
                </span>
                <span className="font-caption text-xs text-text-secondary leading-tight">
                  Scanner
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                  transition-micro hover:bg-secondary-50 focus:outline-none focus:ring-2 
                  focus:ring-primary focus:ring-offset-2
                  ${isActivePath(item.path) 
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary'
                  }
                `}
                title={item.tooltip}
              >
                <Icon name={item.icon} size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary 
                     hover:bg-secondary-50 transition-micro focus:outline-none focus:ring-2 
                     focus:ring-primary focus:ring-offset-2"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-header-height bg-surface border-t border-border z-mobile-menu">
          <nav className="px-content-padding py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-base
                  transition-micro focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isActivePath(item.path) 
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }
                `}
              >
                <Icon name={item.icon} size={20} strokeWidth={2} />
                <div className="flex flex-col items-start">
                  <span>{item.label}</span>
                  <span className="text-xs text-text-muted">{item.tooltip}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;