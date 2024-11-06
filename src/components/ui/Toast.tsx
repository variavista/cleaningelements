import React from 'react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm shadow-xl border border-gray-700">
        {message}
      </div>
    </div>
  );
};

export default Toast;