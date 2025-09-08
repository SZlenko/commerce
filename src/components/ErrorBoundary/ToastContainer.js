import React from 'react';
import Toast from './Toast';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            position={toast.position}
            onClose={() => {
              console.log('ToastContainer calling removeToast for id:', toast.id);
              removeToast(toast.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
