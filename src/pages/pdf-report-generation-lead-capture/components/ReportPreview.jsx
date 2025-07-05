import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReportPreview = ({ reportData, onSectionToggle, selectedSections }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const reportPages = [
    {
      id: 'cover',
      title: 'Executive Summary',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      description: 'Overview of diagnostic results and key findings'
    },
    {
      id: 'findings',
      title: 'Detailed Findings',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Comprehensive analysis of each diagnostic test'
    },
    {
      id: 'technical',
      title: 'Technical Solutions',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      description: 'Code snippets and implementation guides'
    },
    {
      id: 'recommendations',
      title: 'Priority Recommendations',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Action items ranked by business impact'
    }
  ];

  const reportSections = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      description: 'High-level overview of integration health',
      required: true
    },
    {
      id: 'detailed-findings',
      title: 'Detailed Findings',
      description: 'Complete diagnostic test results',
      required: true
    },
    {
      id: 'technical-details',
      title: 'Technical Implementation',
      description: 'Code snippets and API configurations',
      required: false
    },
    {
      id: 'fix-instructions',
      title: 'Step-by-Step Fix Instructions',
      description: 'Detailed remediation guidance',
      required: false
    },
    {
      id: 'priority-matrix',
      title: 'Fix Priority Matrix',
      description: 'Issues ranked by impact and effort',
      required: false
    },
    {
      id: 'best-practices',
      title: 'Best Practices Guide',
      description: 'Recommendations for ongoing maintenance',
      required: false
    }
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % reportPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + reportPages.length) % reportPages.length);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Report Preview
          </h2>
          <p className="text-sm text-text-secondary">
            Customize your diagnostic report before generation
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="FileText" size={16} />
          <span>~{reportPages.length} pages</span>
        </div>
      </div>

      {/* Report Preview Area */}
      <div className="mb-6">
        {/* Desktop Preview */}
        <div className="hidden md:block">
          <div className="relative bg-secondary-50 rounded-lg p-4 mb-4">
            <div className="aspect-[8.5/11] bg-surface rounded shadow-card overflow-hidden">
              <Image
                src={reportPages[currentPage].thumbnail}
                alt={reportPages[currentPage].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    {reportPages[currentPage].title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {reportPages[currentPage].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <button
                onClick={prevPage}
                className="w-8 h-8 bg-surface rounded-full shadow-card flex items-center justify-center
                         text-text-secondary hover:text-text-primary transition-micro"
                disabled={currentPage === 0}
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <button
                onClick={nextPage}
                className="w-8 h-8 bg-surface rounded-full shadow-card flex items-center justify-center
                         text-text-secondary hover:text-text-primary transition-micro"
                disabled={currentPage === reportPages.length - 1}
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>

          {/* Page Thumbnails */}
          <div className="flex space-x-2 justify-center">
            {reportPages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => goToPage(index)}
                className={`w-16 h-20 rounded border-2 overflow-hidden transition-micro ${
                  currentPage === index
                    ? 'border-primary shadow-card'
                    : 'border-border hover:border-secondary-300'
                }`}
              >
                <Image
                  src={page.thumbnail}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="md:hidden">
          <div className="bg-secondary-50 rounded-lg p-4 mb-4">
            <div className="aspect-[4/5] bg-surface rounded shadow-card overflow-hidden">
              <Image
                src={reportPages[currentPage].thumbnail}
                alt={reportPages[currentPage].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevPage}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-micro"
              disabled={currentPage === 0}
            >
              <Icon name="ChevronLeft" size={16} />
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              <h3 className="font-medium text-text-primary">
                {reportPages[currentPage].title}
              </h3>
              <p className="text-xs text-text-secondary">
                Page {currentPage + 1} of {reportPages.length}
              </p>
            </div>
            
            <button
              onClick={nextPage}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-micro"
              disabled={currentPage === reportPages.length - 1}
            >
              <span>Next</span>
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Report Customization */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Customize Report Sections
        </h3>
        <div className="space-y-3">
          {reportSections.map((section) => (
            <div
              key={section.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-secondary-50 transition-micro"
            >
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={section.id}
                  checked={selectedSections.includes(section.id)}
                  onChange={() => onSectionToggle(section.id)}
                  disabled={section.required}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 disabled:opacity-50"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={section.id}
                    className="text-sm font-medium text-text-primary cursor-pointer"
                  >
                    {section.title}
                  </label>
                  {section.required && (
                    <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-text-primary">
              {selectedSections.length}
            </div>
            <div className="text-xs text-text-secondary">Sections</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text-primary">
              ~2.5MB
            </div>
            <div className="text-xs text-text-secondary">File Size</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text-primary">
              30-45s
            </div>
            <div className="text-xs text-text-secondary">Generation Time</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text-primary">
              PDF
            </div>
            <div className="text-xs text-text-secondary">Format</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;