
import React from 'react';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';

interface EmergencyAlertProps {
  type: 'flood' | 'earthquake' | 'cyclone' | 'landslide' | 'fire';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  message: string;
  timestamp: string;
}

const EmergencyAlert = ({ type, severity, location, message, timestamp }: EmergencyAlertProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 border-red-700';
      case 'high': return 'bg-orange-500 border-orange-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600';
      case 'low': return 'bg-blue-500 border-blue-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    // Using available icons for different disaster types
    return <AlertTriangle className="w-6 h-6" />;
  };

  return (
    <div className={`${getSeverityColor(severity)} text-white p-4 rounded-lg border-l-4 shadow-lg mb-4 animate-pulse`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getTypeIcon(type)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold capitalize">{type} Alert</h3>
            <span className="text-xs uppercase font-bold px-2 py-1 bg-black bg-opacity-20 rounded">
              {severity}
            </span>
          </div>
          <p className="text-sm mb-2">{message}</p>
          <div className="flex items-center text-xs space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
