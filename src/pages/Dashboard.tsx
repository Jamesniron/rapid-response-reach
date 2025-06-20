
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import EmergencyAlert from '../components/EmergencyAlert';
import WeatherWidget from '../components/WeatherWidget';
import EmergencyButton from '../components/EmergencyButton';
import { AlertTriangle, Phone, MapPin, Clock, Bell } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Dashboard = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const { toast } = useToast();

  // Mock data - in real app this would come from APIs
  const alerts = [
    {
      type: 'flood' as const,
      severity: 'high' as const,
      location: 'Kurunegala District',
      message: 'Heavy rainfall causing flooding in low-lying areas. Avoid travel near river banks.',
      timestamp: '2 hours ago'
    },
    {
      type: 'landslide' as const,
      severity: 'medium' as const,
      location: 'Kandy Hills',
      message: 'Landslide warning issued for hill country areas due to continuous rain.',
      timestamp: '4 hours ago'
    }
  ];

  const handleEmergencyCall = () => {
    setIsEmergencyMode(true);
    toast({
      title: "Emergency Call Initiated",
      description: "Connecting you with emergency medical team...",
      variant: "destructive",
    });
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Connected to Emergency Team",
        description: "Dr. Perera is ready to assist you. Stay calm and follow instructions.",
      });
    }, 3000);
  };

  const quickActions = [
    { icon: Phone, label: 'Police', number: '119', color: 'bg-blue-600' },
    { icon: Phone, label: 'Fire Brigade', number: '110', color: 'bg-red-600' },
    { icon: Phone, label: 'Ambulance', number: '108', color: 'bg-green-600' },
    { icon: MapPin, label: 'Nearest Hospital', number: 'Find', color: 'bg-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Dashboard</h1>
          <p className="text-gray-600 mt-2">Stay informed and prepared for any emergency situation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Alerts and Weather */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Bell className="w-6 h-6 mr-2 text-red-600" />
                  Active Alerts
                </h2>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {alerts.length} Active
                </span>
              </div>
              
              {alerts.map((alert, index) => (
                <EmergencyAlert key={index} {...alert} />
              ))}
            </div>

            {/* Emergency Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency Actions</h2>
              
              <div className="mb-6">
                <EmergencyButton 
                  onClick={handleEmergencyCall}
                  disabled={isEmergencyMode}
                />
                {isEmergencyMode && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-800 font-semibold">Emergency call in progress...</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Medical team notified. Please stay on the line and follow instructions.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
                      onClick={() => toast({
                        title: `Calling ${action.label}`,
                        description: `Dialing ${action.number}...`,
                      })}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-semibold">{action.label}</div>
                      <div className="text-xs opacity-90">{action.number}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Weather and Status */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Safe Zone
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Emergency Contacts</span>
                  <span className="text-blue-600 font-semibold">3 Added</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Medical Info</span>
                  <span className="text-orange-600 font-semibold">Update Required</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Profile updated</span>
                  <span className="text-gray-400">2 days ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">Flood alert received</span>
                  <span className="text-gray-400">3 days ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Emergency contact added</span>
                  <span className="text-gray-400">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
