import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { User, Phone, Mail, MapPin, Heart, Settings, Bell, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    nic: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    medicalInfo: '',
    notificationPreferences: {
      email: true,
      sms: true,
      push: true
    }
  });
  const { toast } = useToast();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedProfile) {
      // Load saved profile data
      setProfile(JSON.parse(savedProfile));
    } else if (userEmail) {
      // Create initial profile with logged-in email
      setProfile(prev => ({
        ...prev,
        email: userEmail,
        fullName: 'User', // Default name, user can edit
      }));
    }
  }, []);

  // Check for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast({
        title: "App Installing",
        description: "Emergyfy is being installed on your device.",
      });
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleSave = () => {
    // Save profile data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully saved.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (type: string) => {
    setProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type as keyof typeof prev.notificationPreferences]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.fullName || 'User Profile'}
                </h1>
                <p className="text-gray-600">Emergency Profile</p>
              </div>
            </div>
            <div className="flex space-x-3">
              {showInstallButton && (
                <button
                  onClick={handleInstallApp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App</span>
                </button>
              )}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isEditing 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-red-600" />
              Personal Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-900">{profile.fullName || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number</label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="nic"
                      value={profile.nic}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your NIC number"
                    />
                    <p className="text-xs text-amber-600 mt-1">⚠️ Please ensure NIC number is correct. Changes require verification.</p>
                  </div>
                ) : (
                  <p className="text-gray-900">{profile.nic || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {profile.email || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {profile.phone || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-900 flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                    {profile.address || 'Not set'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                Emergency Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={profile.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter emergency contact number"
                    />
                  ) : (
                    <p className="text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.emergencyContact || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical Information</label>
                  {isEditing ? (
                    <textarea
                      name="medicalInfo"
                      value={profile.medicalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Any allergies, medical conditions, or medications"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.medicalInfo || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile App Installation Guide */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Download className="w-5 h-5 mr-2 text-green-600" />
                Mobile App Installation
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Install Emergyfy as Mobile App</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Get faster access to emergency services by installing our app on your device.
                  </p>
                  
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Android:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Tap the menu (⋮) in your browser</li>
                      <li>Select "Add to Home screen" or "Install app"</li>
                      <li>Confirm installation</li>
                    </ul>
                    
                    <p className="mt-3"><strong>iPhone/iPad:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Tap the Share button (□↗) in Safari</li>
                      <li>Scroll down and tap "Add to Home Screen"</li>
                      <li>Tap "Add" to confirm</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Benefits of Installing:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Works offline for emergency situations</li>
                    <li>• Faster access from your home screen</li>
                    <li>• Push notifications for alerts</li>
                    <li>• Full-screen experience</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-red-600" />
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Email Alerts</p>
                    <p className="text-sm text-gray-600">Receive emergency alerts via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notificationPreferences.email ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notificationPreferences.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">SMS Alerts</p>
                    <p className="text-sm text-gray-600">Receive emergency alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notificationPreferences.sms ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notificationPreferences.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive alerts on your device</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notificationPreferences.push ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notificationPreferences.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
