import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
      <p className="text-gray-600 text-lg">Fetching weather data...</p>
    </div>
  );
};

export default LoadingSpinner;