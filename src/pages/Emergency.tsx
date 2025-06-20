
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import FirstAidGuide from '../components/FirstAidGuide';
import EmergencyButton from '../components/EmergencyButton';
import { Video, Phone, MapPin, AlertTriangle, Heart, Flame, Bone, Droplets, Zap, Car } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Emergency = () => {
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<string>('');
  const { toast } = useToast();

  const emergencyTypes = [
    { id: 'snakebite', name: 'Snake Bite', icon: AlertTriangle, urgent: true, color: 'bg-red-500' },
    { id: 'heartattack', name: 'Heart Attack', icon: Heart, urgent: true, color: 'bg-red-600' },
    { id: 'accident', name: 'Accident', icon: Car, urgent: true, color: 'bg-red-500' },
    { id: 'burn', name: 'Burn Injury', icon: Flame, urgent: false, color: 'bg-orange-500' },
    { id: 'fracture', name: 'Fracture', icon: Bone, urgent: false, color: 'bg-yellow-500' },
    { id: 'poisoning', name: 'Poisoning', icon: Droplets, urgent: true, color: 'bg-purple-500' },
    { id: 'electric', name: 'Electric Shock', icon: Zap, urgent: true, color: 'bg-blue-500' },
    { id: 'drowning', name: 'Drowning', icon: Droplets, urgent: true, color: 'bg-cyan-500' }
  ];

  const handleVideoCall = () => {
    if (!selectedEmergencyType) {
      toast({
        title: "Please Select Emergency Type",
        description: "Please select your emergency type before starting a video call.",
        variant: "destructive",
      });
      return;
    }

    setIsVideoCallActive(true);
    toast({
      title: "Initiating Video Call",
      description: "Connecting with emergency medical team...",
      variant: "destructive",
    });

    setTimeout(() => {
      toast({
        title: "Video Call Connected",
        description: `Dr. Silva is now live for ${emergencyTypes.find(t => t.id === selectedEmergencyType)?.name}. Please describe your emergency.`,
      });
    }, 2000);
  };

  const handleEmergencyTypeSelect = (typeId: string) => {
    setSelectedEmergencyType(typeId);
    const selectedType = emergencyTypes.find(t => t.id === typeId);
    toast({
      title: "Emergency Type Selected",
      description: `Selected: ${selectedType?.name}. ${selectedType?.urgent ? 'This is a critical emergency!' : 'Please follow first aid guidelines.'}`,
      variant: selectedType?.urgent ? "destructive" : "default",
    });
  };

  const nearbyHospitals = [
    { name: 'Kurunegala General Hospital', distance: '2.1 km', phone: '+94-37-2222221', specialties: 'Emergency, Trauma' },
    { name: 'Lanka Hospital Kurunegala', distance: '3.5 km', phone: '+94-37-2233445', specialties: 'Cardiology, Burns' },
    { name: 'National Hospital Emergency', distance: '5.2 km', phone: '+94-37-2244567', specialties: 'Poison Control, ICU' },
    { name: 'Wayamba Provincial Hospital', distance: '1.8 km', phone: '+94-37-2255667', specialties: 'General Emergency' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Emergency Support</h1>
          <p className="text-xl text-gray-600">Get immediate help for medical emergencies and access first aid guidance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Emergency Actions */}
          <div className="space-y-6">
            {/* Emergency Type Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What's your emergency?</h2>
              <div className="grid grid-cols-2 gap-3">
                {emergencyTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleEmergencyTypeSelect(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedEmergencyType === type.id
                          ? 'border-red-500 bg-red-50 shadow-md'
                          : 'border-gray-200 hover:border-red-300 hover:shadow-sm'
                      } ${type.urgent ? 'bg-red-50' : 'bg-gray-50'}`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`p-2 rounded-full ${type.color} text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`font-medium text-center text-sm ${
                          type.urgent ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {type.name}
                        </span>
                        {type.urgent && (
                          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                            URGENT
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {selectedEmergencyType && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Selected:</strong> {emergencyTypes.find(t => t.id === selectedEmergencyType)?.name}
                    {emergencyTypes.find(t => t.id === selectedEmergencyType)?.urgent && 
                      " - This is a critical emergency! Consider calling emergency services immediately."
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Video Call Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Medical Video Consultation</h2>
              
              {!isVideoCallActive ? (
                <div className="text-center">
                  <div className="bg-red-50 p-6 rounded-lg mb-4">
                    <Video className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Connect with Medical Professional
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get real-time guidance from qualified medical professionals during your emergency.
                    </p>
                    {selectedEmergencyType && (
                      <p className="text-sm text-blue-600 mb-4">
                        Ready to connect for: <strong>{emergencyTypes.find(t => t.id === selectedEmergencyType)?.name}</strong>
                      </p>
                    )}
                  </div>
                  
                  <EmergencyButton onClick={handleVideoCall} />
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Available 24/7 • Average response time: 30 seconds</p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Video Call Active
                    </h3>
                    <p className="text-green-700 mb-2">
                      Connected with Dr. Silva - Emergency Medicine Specialist
                    </p>
                    <p className="text-sm text-green-600 mb-4">
                      Emergency Type: {emergencyTypes.find(t => t.id === selectedEmergencyType)?.name}
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Video Stream Active</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setIsVideoCallActive(false)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      >
                        End Call
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Mute
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nearby Hospitals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-red-600" />
                Nearby Hospitals
              </h2>
              <div className="space-y-4">
                {nearbyHospitals.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800">{hospital.name}</h3>
                      <p className="text-sm text-gray-600">{hospital.distance} away</p>
                      <p className="text-xs text-blue-600">{hospital.specialties}</p>
                    </div>
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      onClick={() => toast({
                        title: "Calling Hospital",
                        description: `Dialing ${hospital.name}...`,
                      })}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - First Aid Guide */}
          <div>
            <FirstAidGuide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
