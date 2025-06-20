
import React from 'react';
import { MapPin, Navigation, RefreshCw, Play, Square } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';

const LocationWidget = () => {
  const { 
    location, 
    error, 
    isLoading, 
    isWatching,
    getCurrentLocation, 
    startWatching, 
    stopWatching 
  } = useLocation();

  const formatLocation = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Your Location
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-colors ${
              isLoading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={isWatching ? stopWatching : startWatching}
            className={`p-2 rounded-lg transition-colors ${
              isWatching 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isWatching ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {location && (
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Navigation className="w-4 h-4 mr-2" />
            <span className="font-mono">
              {formatLocation(location.latitude, location.longitude)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Accuracy:</span>
              <span className="ml-2 font-semibold">
                {Math.round(location.accuracy)}m
              </span>
            </div>
            <div>
              <span className="text-gray-500">Updated:</span>
              <span className="ml-2 font-semibold">
                {formatTimestamp(location.timestamp)}
              </span>
            </div>
          </div>
          {isWatching && (
            <div className="flex items-center text-green-600 bg-green-50 p-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">Live tracking active</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> {error.message}
          </p>
        </div>
      )}

      {!location && !error && !isLoading && (
        <div className="text-center py-4">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Click refresh to get your location</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Your location is used to connect you with nearby emergency services and hospitals.
          {isWatching && " Live tracking helps emergency responders locate you quickly."}
        </p>
      </div>
    </div>
  );
};

export default LocationWidget;
