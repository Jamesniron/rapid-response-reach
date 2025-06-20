
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, Phone, MapPin, Users } from 'lucide-react';
import Navigation from '../components/Navigation';

const Index = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Real-time Alerts",
      description: "Get instant notifications about disasters in your area based on your location."
    },
    {
      icon: Phone,
      title: "Emergency Video Calls",
      description: "Connect with medical professionals for immediate guidance during emergencies."
    },
    {
      icon: Shield,
      title: "First Aid Guides",
      description: "Access step-by-step first aid instructions for various emergency situations."
    },
    {
      icon: MapPin,
      title: "Location-based Services",
      description: "Find nearby hospitals, emergency services, and safe zones instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Emergency
              <span className="text-red-600 block">Response Partner</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Emergyfy delivers real-time emergency alerts, first aid support, and video-based medical help 
              for natural disasters and medical emergencies when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started - It's Free
              </Link>
              <Link
                to="/dashboard"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-red-600 hover:bg-red-50 transition-colors shadow-lg"
              >
                View Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Emergency Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From natural disasters to medical emergencies, Emergyfy provides the tools and support you need to stay safe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Emergency Types Section */}
      <div className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              We Cover All Emergency Types
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              From natural disasters to medical emergencies, get the help you need when every second counts.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Floods', 'Earthquakes', 'Cyclones', 'Landslides', 'Fires', 'Snake Bites', 'Heart Attack', 'Accidents', 'Burns', 'Fractures'].map((emergency, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-20 transition-all">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <span className="font-medium">{emergency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Users className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl font-bold mb-4">
            Join Thousands Who Trust Emergyfy
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be prepared for any emergency. Register now and get instant access to life-saving resources.
          </p>
          <Link
            to="/register"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
