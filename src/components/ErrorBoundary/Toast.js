import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose, 
  position = 'top-right' 
}) => {
  const handleClose = () => {
    console.log('Toast close button clicked');
    onClose?.();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" />;
      case 'error':
        return <FiXCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" />;
      default:
        return <FiInfo className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      default:
        return 'text-blue-800';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div
      className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full mx-4 transition-all duration-200 opacity-100 translate-y-0`}
    >
      <div className={`${getBgColor()} border rounded-lg shadow-lg p-4 flex items-start gap-3`}>
        <div className="flex-shrink-0 text-xl">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </p>
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
