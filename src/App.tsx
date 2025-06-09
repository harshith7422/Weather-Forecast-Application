import React, { useEffect } from 'react';
import { Cloud } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchInput from './components/SearchInput';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import useWeather from './hooks/useWeather';

function App() {
  const { weather, isLoading, error, fetchWeather } = useWeather();

  useEffect(() => {
    // Load default city on app start
    fetchWeather('London');
  }, []);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const handleRetry = () => {
    if (weather) {
      fetchWeather(weather.city);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud size={48} className="text-white mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Weather Forecast
            </h1>
          </div>
          <p className="text-white/80 text-lg">
            Get real-time weather updates for any city worldwide
          </p>
        </div>

        {/* Search Input */}
        <SearchInput onSearch={handleSearch} isLoading={isLoading} />

        {/* Weather Content */}
        <div className="flex justify-center">
          {isLoading && <LoadingSpinner />}

          {error && !isLoading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {weather && !isLoading && !error && (
            <div className="w-full max-w-lg">
              <WeatherCard weather={weather} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;