import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <AlertCircle size={24} className="text-red-500 mr-3" />
        <h3 className="text-red-800 font-semibold text-lg">Weather Unavailable</h3>
      </div>
      
      <p className="text-red-700 mb-4">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200"
        >
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;