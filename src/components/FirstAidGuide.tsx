
import React, { useState } from 'react';
import { AlertTriangle, Video, FileText } from 'lucide-react';

interface FirstAidStep {
  step: number;
  title: string;
  description: string;
  critical?: boolean;
}

const FirstAidGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState<string>('snakebite');

  const snakeBiteSteps: FirstAidStep[] = [
    {
      step: 1,
      title: "Stay Calm",
      description: "Keep the victim calm and still. Movement can spread venom faster.",
      critical: true
    },
    {
      step: 2,
      title: "Call Emergency Services",
      description: "Immediately call emergency services or use our emergency video call.",
      critical: true
    },
    {
      step: 3,
      title: "Remove Jewelry",
      description: "Remove rings, watches, and tight clothing before swelling begins."
    },
    {
      step: 4,
      title: "Position the Bite",
      description: "Keep the bitten area lower than the heart if possible."
    },
    {
      step: 5,
      title: "Clean the Wound",
      description: "Clean with water if available, but don't delay other treatments."
    }
  ];

  const guides = [
    { id: 'snakebite', name: 'Snake Bite', icon: AlertTriangle },
    { id: 'cpr', name: 'CPR', icon: FileText },
    { id: 'burns', name: 'Burns', icon: FileText },
    { id: 'fracture', name: 'Fractures', icon: FileText }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">First Aid Guides</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {guides.map((guide) => {
          const IconComponent = guide.icon;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedGuide === guide.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{guide.name}</span>
            </button>
          );
        })}
      </div>

      {selectedGuide === 'snakebite' && (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 font-semibold">
                Time is critical! Seek immediate medical attention.
              </span>
            </div>
          </div>

          {snakeBiteSteps.map((step) => (
            <div
              key={step.step}
              className={`p-4 rounded-lg border-l-4 ${
                step.critical
                  ? 'bg-red-50 border-red-500'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  step.critical ? 'bg-red-500' : 'bg-gray-400'
                }`}>
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Video className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Need immediate help?</span>
            </div>
            <p className="text-blue-700 text-sm mb-3">
              Connect with our medical team for real-time guidance during the emergency.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Video Call
            </button>
          </div>
        </div>
      )}

      {selectedGuide !== 'snakebite' && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>First aid guide for {guides.find(g => g.id === selectedGuide)?.name} coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default FirstAidGuide;
