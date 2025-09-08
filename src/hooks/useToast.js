import React, { useState, useCallback } from 'react';

// Global toast state - simple approach
let globalToasts = [];
let globalListeners = [];

const notifyGlobalListeners = () => {
  globalListeners.forEach(listener => listener([...globalToasts]));
};

const addGlobalToast = (toast) => {
  const id = Date.now() + Math.random();
  const newToast = {
    id,
    duration: 5000,
    position: 'top-right',
    ...toast,
  };
  
  console.log('Adding toast with id:', id, newToast);
  globalToasts.push(newToast);
  console.log('All toasts after adding:', globalToasts);
  notifyGlobalListeners();
  
  // Auto-remove after duration
  if (newToast.duration > 0) {
    setTimeout(() => {
      removeGlobalToast(id);
    }, newToast.duration);
  }
  
  return id;
};

const removeGlobalToast = (id) => {
  console.log('Removing toast with id:', id);
  globalToasts = globalToasts.filter(toast => toast.id !== id);
  console.log('Remaining toasts:', globalToasts);
  notifyGlobalListeners();
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  // Subscribe to global toast changes
  React.useEffect(() => {
    const listener = (newToasts) => setToasts(newToasts);
    globalListeners.push(listener);
    
    // Set initial toasts
    setToasts([...globalToasts]);
    
    return () => {
      globalListeners = globalListeners.filter(l => l !== listener);
    };
  }, []);

  const showSuccess = useCallback((message, options = {}) => {
    return addGlobalToast({ message, type: 'success', ...options });
  }, []);

  const showError = useCallback((message, options = {}) => {
    return addGlobalToast({ message, type: 'error', ...options });
  }, []);

  const showWarning = useCallback((message, options = {}) => {
    return addGlobalToast({ message, type: 'warning', ...options });
  }, []);

  const showInfo = useCallback((message, options = {}) => {
    return addGlobalToast({ message, type: 'info', ...options });
  }, []);

  const removeToast = useCallback((id) => {
    removeGlobalToast(id);
  }, []);

  const clearAll = useCallback(() => {
    globalToasts = [];
    notifyGlobalListeners();
  }, []);

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll,
  };
};
