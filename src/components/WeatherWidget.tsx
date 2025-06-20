
import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, MapPin } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const WeatherWidget = () => {
  // Mock weather data - in real app this would come from weather API
  const weatherData: WeatherData = {
    location: "Kurunegala, Sri Lanka",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'partly cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{weatherData.location}</span>
        </div>
        {getWeatherIcon(weatherData.condition)}
      </div>
      
      <div className="text-center mb-4">
        <div className="text-4xl font-bold">{weatherData.temperature}°C</div>
        <div className="text-sm opacity-90">{weatherData.condition}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="opacity-75">Humidity</div>
          <div className="font-semibold">{weatherData.humidity}%</div>
        </div>
        <div>
          <div className="opacity-75">Wind Speed</div>
          <div className="font-semibold">{weatherData.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
