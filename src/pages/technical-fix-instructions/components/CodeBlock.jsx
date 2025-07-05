import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeBlock = ({ code, language = 'javascript', title, description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="bg-secondary-900 rounded-lg overflow-hidden border border-secondary-700">
      {title && (
        <div className="bg-secondary-800 px-4 py-2 border-b border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">{title}</h4>
              {description && (
                <p className="text-xs text-secondary-300 mt-1">{description}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-secondary-400 px-2 py-1 bg-secondary-700 rounded">
                {language}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName={copied ? "Check" : "Copy"}
                onClick={handleCopy}
                className="text-secondary-300 hover:text-white hover:bg-secondary-700"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        {!title && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-secondary-800 hover:bg-secondary-700 rounded text-secondary-300 hover:text-white transition-micro z-10"
            title="Copy code"
          >
            <Icon name={copied ? "Check" : "Copy"} size={16} />
          </button>
        )}
        
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-secondary-100 font-mono leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;