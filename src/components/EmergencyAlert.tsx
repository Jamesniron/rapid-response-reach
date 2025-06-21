
import React from 'react';
import { AlertTriangle, MapPin, Clock, Mountain, Wind, Flame } from 'lucide-react';

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
    switch (type) {
      case 'earthquake': return <Mountain className="w-6 h-6" />;
      case 'cyclone': return <Wind className="w-6 h-6" />;
      case 'landslide': return <Mountain className="w-6 h-6" />;
      case 'fire': return <Flame className="w-6 h-6" />;
      case 'flood': return <AlertTriangle className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  const getAlertActions = (type: string) => {
    switch (type) {
      case 'earthquake':
        return 'Drop, Cover, Hold On. Stay away from windows and heavy objects.';
      case 'cyclone':
        return 'Seek shelter immediately. Stay indoors and away from windows.';
      case 'landslide':
        return 'Evacuate to higher ground immediately. Avoid the slide area.';
      case 'fire':
        return 'Evacuate immediately. Stay low and move to assembly point.';
      case 'flood':
        return 'Move to higher ground. Avoid walking or driving through flood water.';
      default:
        return 'Follow emergency protocols and stay alert.';
    }
  };

  return (
    <div className={`${getSeverityColor(severity)} text-white p-6 rounded-lg border-l-4 shadow-lg mb-4 animate-pulse`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getTypeIcon(type)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold capitalize">{type} Alert</h3>
            <span className="text-sm uppercase font-bold px-3 py-1 bg-black bg-opacity-20 rounded-full">
              {severity}
            </span>
          </div>
          <p className="text-lg mb-3">{message}</p>
          <div className="bg-black bg-opacity-20 p-3 rounded-lg mb-3">
            <p className="font-semibold text-sm">Immediate Action Required:</p>
            <p className="text-sm">{getAlertActions(type)}</p>
          </div>
          <div className="flex items-center text-sm space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
