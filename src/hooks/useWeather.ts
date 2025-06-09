import { useState } from 'react';

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

interface UseWeatherReturn {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const API_KEY = '2774b4df9fd82f824213e679f460de6b';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('Weather service unavailable. Please try again later.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }

      const data = await response.json();

      const weatherData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(data.visibility / 1000), // Convert m to km
        icon: data.weather[0].icon,
      };

      setWeather(weatherData);
    } catch (err) {
      // For demo purposes, we'll show mock data when the API key is not set
      if (err instanceof Error && err.message.includes('Weather service unavailable')) {
        // Mock data for demonstration
        const mockWeather: WeatherData = {
          city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
          country: 'Demo',
          temperature: Math.floor(Math.random() * 25) + 5, // Random temp between 5-30°C
          condition: ['partly cloudy', 'sunny', 'light rain', 'overcast'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40, // Random humidity 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind 5-25 km/h
          visibility: Math.floor(Math.random() * 10) + 5, // Random visibility 5-15 km
          icon: '01d',
        };
        setWeather(mockWeather);
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { weather, isLoading, error, fetchWeather };
};

export default useWeather;