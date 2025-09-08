import React from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ErrorBoundary/ToastContainer';

export const ToastProvider = ({ children }) => {
  const { toasts, removeToast } = useToast();

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};
