import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Eye } from 'lucide-react';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    const iconProps = { size: 64, className: "text-white drop-shadow-lg" };
    
    if (condition.toLowerCase().includes('rain')) return <CloudRain {...iconProps} />;
    if (condition.toLowerCase().includes('snow')) return <CloudSnow {...iconProps} />;
    if (condition.toLowerCase().includes('cloud')) return <Cloud {...iconProps} />;
    return <Sun {...iconProps} />;
  };

  const getBackgroundGradient = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) 
      return 'from-slate-600 via-slate-700 to-slate-800';
    if (condition.toLowerCase().includes('snow')) 
      return 'from-blue-300 via-blue-400 to-blue-600';
    if (condition.toLowerCase().includes('cloud')) 
      return 'from-gray-400 via-gray-500 to-gray-600';
    return 'from-orange-400 via-yellow-500 to-yellow-600';
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBackgroundGradient(weather.condition)} p-8 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-500`}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">{weather.city}</h2>
            <p className="text-white/80 text-lg">{weather.country}</p>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weather.condition)}
            <p className="text-white/90 text-sm mt-2 capitalize">{weather.condition}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-6xl font-light">{Math.round(weather.temperature)}</span>
            <span className="text-2xl font-light ml-1">°C</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Droplets size={20} className="text-white/80 mr-2" />
              <span className="text-white/80 text-sm">Humidity</span>
            </div>
            <p className="text-xl font-semibold">{weather.humidity}%</p>
          </div>

          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Wind size={20} className="text-white/80 mr-2" />
              <span className="text-white/80 text-sm">Wind</span>
            </div>
            <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
          </div>

          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Eye size={20} className="text-white/80 mr-2" />
              <span className="text-white/80 text-sm">Visibility</span>
            </div>
            <p className="text-xl font-semibold">{weather.visibility} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;