import React from 'react';
import Navigation from '../components/Navigation';
import EmergencyAlert from '../components/EmergencyAlert';
import WeatherWidget from '../components/WeatherWidget';
import LocationWidget from '../components/LocationWidget';
import { Phone, MapPin, Heart, AlertTriangle, Users, Clock, Siren } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();

  const emergencyContacts = [
    { name: 'Police', number: '119', color: 'bg-blue-600' },
    { name: 'Fire & Rescue', number: '110', color: 'bg-red-600' },
    { name: 'Ambulance', number: '1990', color: 'bg-green-600' }
  ];

  const recentAlerts = [
    { 
      id: 1, 
      type: 'flood', 
      location: 'Kurunegala District', 
      time: '2 hours ago',
      severity: 'high',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=200&fit=crop'
    },
    { 
      id: 2, 
      type: 'accident', 
      location: 'A1 Highway', 
      time: '4 hours ago',
      severity: 'medium',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=200&fit=crop'
    }
  ];

  const quickActions = [
    { name: 'Emergency Call', icon: Phone, path: '/emergency', color: 'bg-red-600' },
    { name: 'Find Hospital', icon: MapPin, path: '/emergency', color: 'bg-blue-600' },
    { name: 'First Aid Guide', icon: Heart, path: '/emergency', color: 'bg-green-600' },
    { name: 'Report Emergency', icon: AlertTriangle, path: '/emergency', color: 'bg-orange-600' }
  ];

  const handleSOSEmergency = () => {
    toast({
      title: "SOS Emergency Activated",
      description: "Contacting emergency services and sending your location...",
      variant: "destructive",
    });
    
    // Simulate emergency call initiation
    setTimeout(() => {
      toast({
        title: "Emergency Services Notified",
        description: "Help is on the way. Stay calm and follow any instructions given.",
        variant: "destructive",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with SOS Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Dashboard</h1>
            <p className="text-gray-600">Monitor alerts and access emergency services quickly</p>
          </div>
          
          {/* SOS Emergency Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleSOSEmergency}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-3 border-4 border-red-700 hover:border-red-800 animate-pulse"
            >
              <Siren className="w-6 h-6" />
              <div className="text-center">
                <div className="text-lg">SOS</div>
                <div className="text-xs">EMERGENCY</div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
                    >
                      <IconComponent className="w-8 h-8" />
                      <span className="font-semibold">{action.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-600" />
                Emergency Contacts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className={`${contact.color} text-white p-4 rounded-lg text-center`}>
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-2xl font-bold mt-2">{contact.number}</p>
                    <button className="mt-3 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition-colors">
                      Call Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Recent Alerts
              </h2>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {/* Disaster Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={alert.image} 
                        alt={`${alert.type} disaster`}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                      />
                    </div>
                    
                    {/* Alert Content */}
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-500' : 
                          alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-800 capitalize">{alert.type}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {alert.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-8">
            {/* Location Widget */}
            <LocationWidget />
            
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Community
              </h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2,847</div>
                  <div className="text-sm text-green-700">Active Users</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-blue-700">Lives Saved</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-orange-700">Support</div>
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
