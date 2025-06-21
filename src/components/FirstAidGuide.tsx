
import React, { useState } from 'react';
import { AlertTriangle, Video, FileText, Heart, Flame, Bone, Droplets, Zap, Mountain, Wind } from 'lucide-react';

interface FirstAidStep {
  step: number;
  title: string;
  description: string;
  critical?: boolean;
  warning?: string;
}

const FirstAidGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState<string>('snakebite');

  const firstAidData = {
    snakebite: {
      steps: [
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
        },
        {
          step: 6,
          title: "Mark Swelling",
          description: "Mark the edge of swelling with a pen and note the time.",
          warning: "Do NOT cut the wound, suck the venom, or apply ice."
        }
      ]
    },
    heartattack: {
      steps: [
        {
          step: 1,
          title: "Call Emergency Services",
          description: "Call 1990 immediately. Time is critical for heart attacks.",
          critical: true
        },
        {
          step: 2,
          title: "Give Aspirin",
          description: "If conscious and not allergic, give 300mg aspirin to chew.",
          critical: true
        },
        {
          step: 3,
          title: "Position Comfortably",
          description: "Sit them upright, leaning against something for support."
        },
        {
          step: 4,
          title: "Loosen Clothing",
          description: "Loosen any tight clothing around neck, chest, and waist."
        },
        {
          step: 5,
          title: "Monitor Breathing",
          description: "Check breathing and pulse every 2 minutes.",
          critical: true
        },
        {
          step: 6,
          title: "Prepare for CPR",
          description: "If they become unconscious and stop breathing, start CPR.",
          warning: "Do NOT leave them alone. Stay with them until help arrives."
        }
      ]
    },
    cpr: {
      steps: [
        {
          step: 1,
          title: "Check Responsiveness",
          description: "Tap shoulders firmly and shout 'Are you okay?'",
          critical: true
        },
        {
          step: 2,
          title: "Call for Help",
          description: "Call 1990 and ask someone to find an AED if available.",
          critical: true
        },
        {
          step: 3,
          title: "Position Hands",
          description: "Place heel of one hand on center of chest, other hand on top.",
          critical: true
        },
        {
          step: 4,
          title: "Chest Compressions",
          description: "Push hard and fast at least 2 inches deep, 100-120 per minute.",
          critical: true
        },
        {
          step: 5,
          title: "Give Rescue Breaths",
          description: "Tilt head back, lift chin, give 2 breaths after every 30 compressions."
        },
        {
          step: 6,
          title: "Continue CPR",
          description: "Keep going until emergency services arrive or person responds.",
          warning: "Don't stop CPR unless the person starts breathing normally."
        }
      ]
    },
    burns: {
      steps: [
        {
          step: 1,
          title: "Stop the Burning",
          description: "Remove from heat source. Stop, drop, and roll if clothing is on fire.",
          critical: true
        },
        {
          step: 2,
          title: "Cool the Burn",
          description: "Run cool (not cold) water over burn for 10-20 minutes.",
          critical: true
        },
        {
          step: 3,
          title: "Remove Items",
          description: "Remove jewelry and loose clothing before swelling begins."
        },
        {
          step: 4,
          title: "Protect the Area",
          description: "Cover with sterile gauze or clean cloth. Don't use cotton."
        },
        {
          step: 5,
          title: "Pain Relief",
          description: "Give over-the-counter pain medication if conscious."
        },
        {
          step: 6,
          title: "Seek Medical Help",
          description: "Get medical attention for burns larger than 3 inches.",
          warning: "Do NOT use ice, butter, or ointments on burns."
        }
      ]
    },
    fracture: {
      steps: [
        {
          step: 1,
          title: "Don't Move the Person",
          description: "Keep the injured person still unless they're in immediate danger.",
          critical: true
        },
        {
          step: 2,
          title: "Call Emergency Services",
          description: "Call for medical help, especially for head, neck, or back injuries.",
          critical: true
        },
        {
          step: 3,
          title: "Stop Bleeding",
          description: "Apply pressure around the wound, not directly on protruding bone."
        },
        {
          step: 4,
          title: "Immobilize the Area",
          description: "Support the injured area with splints or slings if trained."
        },
        {
          step: 5,
          title: "Apply Ice",
          description: "Apply ice wrapped in cloth for 15-20 minutes to reduce swelling."
        },
        {
          step: 6,
          title: "Treat for Shock",
          description: "Keep person warm and elevate legs if no spinal injury suspected.",
          warning: "Do NOT try to realign the bone or push protruding bones back."
        }
      ]
    },
    poisoning: {
      steps: [
        {
          step: 1,
          title: "Call Poison Control",
          description: "Call poison control center immediately: 1990",
          critical: true
        },
        {
          step: 2,
          title: "Identify the Poison",
          description: "Try to identify what was consumed and keep the container.",
          critical: true
        },
        {
          step: 3,
          title: "Remove from Mouth",
          description: "If conscious, rinse mouth and remove any remaining substance."
        },
        {
          step: 4,
          title: "Position Safely",
          description: "If conscious, keep sitting up. If unconscious, turn on side."
        },
        {
          step: 5,
          title: "Monitor Vital Signs",
          description: "Check breathing and consciousness every few minutes.",
          critical: true
        },
        {
          step: 6,
          title: "Follow Expert Advice",
          description: "Follow instructions from poison control or emergency services.",
          warning: "Do NOT induce vomiting unless specifically told to do so."
        }
      ]
    },
    earthquake: {
      steps: [
        {
          step: 1,
          title: "Drop, Cover, Hold On",
          description: "Drop to hands and knees, take cover under sturdy desk/table, hold on.",
          critical: true
        },
        {
          step: 2,
          title: "Stay Where You Are",
          description: "If indoors, stay indoors. If outdoors, stay outdoors. Don't run outside.",
          critical: true
        },
        {
          step: 3,
          title: "Protect Your Head",
          description: "Cover head and neck with arms if no shelter available."
        },
        {
          step: 4,
          title: "Stay Away from Hazards",
          description: "Avoid windows, hanging objects, tall furniture that could fall."
        },
        {
          step: 5,
          title: "After Shaking Stops",
          description: "Check for injuries and hazards. Be prepared for aftershocks."
        },
        {
          step: 6,
          title: "Evacuate if Necessary",
          description: "Use stairs, not elevators. Watch for falling debris.",
          warning: "Do NOT stand in doorways - this is outdated advice."
        }
      ]
    },
    cyclone: {
      steps: [
        {
          step: 1,
          title: "Seek Shelter Immediately",
          description: "Get to the lowest floor of a sturdy building, away from windows.",
          critical: true
        },
        {
          step: 2,
          title: "Stay Informed",
          description: "Monitor weather radio or emergency broadcasts for updates.",
          critical: true
        },
        {
          step: 3,
          title: "Stay in Safe Room",
          description: "Choose an interior room on the lowest floor, away from corners."
        },
        {
          step: 4,
          title: "Protect from Debris",
          description: "Get under a sturdy table or cover yourself with mattress/blankets."
        },
        {
          step: 5,
          title: "Wait for All Clear",
          description: "Stay sheltered until authorities confirm the storm has passed."
        },
        {
          step: 6,
          title: "Post-Storm Safety",
          description: "Watch for flooding, downed power lines, and structural damage.",
          warning: "Do NOT go outside during the eye of the storm - winds will return."
        }
      ]
    },
    landslide: {
      steps: [
        {
          step: 1,
          title: "Get to Higher Ground",
          description: "Move away from the slide area to higher, stable ground immediately.",
          critical: true
        },
        {
          step: 2,
          title: "Call Emergency Services",
          description: "Alert authorities about the landslide and any trapped people.",
          critical: true
        },
        {
          step: 3,
          title: "Listen for Unusual Sounds",
          description: "Trees cracking, boulders knocking, or rumbling sounds indicate danger."
        },
        {
          step: 4,
          title: "Stay Alert for Floods",
          description: "Landslides can block rivers and cause sudden flooding."
        },
        {
          step: 5,
          title: "Avoid the Area",
          description: "Stay away from the slide area - additional slides may occur."
        },
        {
          step: 6,
          title: "Check for Injuries",
          description: "Once safe, check for injuries and provide first aid if trained.",
          warning: "Do NOT attempt to rescue others if it puts you in danger."
        }
      ]
    },
    fire: {
      steps: [
        {
          step: 1,
          title: "Alert Everyone",
          description: "Shout 'Fire!' and activate fire alarm if available.",
          critical: true
        },
        {
          step: 2,
          title: "Call Fire Department",
          description: "Call 110 immediately, even if fire seems small.",
          critical: true
        },
        {
          step: 3,
          title: "Get Low and Go",
          description: "Stay low under smoke and move quickly to nearest exit."
        },
        {
          step: 4,
          title: "Feel Doors Before Opening",
          description: "Use back of hand to feel doors. If hot, find another way out."
        },
        {
          step: 5,
          title: "Stop, Drop, Roll",
          description: "If clothes catch fire, stop, drop to ground, and roll to smother flames."
        },
        {
          step: 6,
          title: "Meet at Assembly Point",
          description: "Once outside, go to designated meeting point and stay there.",
          warning: "Do NOT go back inside for any reason - let firefighters handle it."
        }
      ]
    }
  };

  const guides = [
    { id: 'snakebite', name: 'Snake Bite', icon: AlertTriangle, urgent: true },
    { id: 'heartattack', name: 'Heart Attack', icon: Heart, urgent: true },
    { id: 'cpr', name: 'CPR', icon: Heart, urgent: true },
    { id: 'burns', name: 'Burns', icon: Flame, urgent: false },
    { id: 'fracture', name: 'Fractures', icon: Bone, urgent: false },
    { id: 'poisoning', name: 'Poisoning', icon: Droplets, urgent: true },
    { id: 'earthquake', name: 'Earthquake', icon: Mountain, urgent: true },
    { id: 'cyclone', name: 'Cyclone', icon: Wind, urgent: true },
    { id: 'landslide', name: 'Landslide', icon: Mountain, urgent: true },
    { id: 'fire', name: 'Fire Emergency', icon: Flame, urgent: true }
  ];

  const currentGuide = firstAidData[selectedGuide as keyof typeof firstAidData];

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
                  ? 'bg-red-600 text-white'
                  : guide.urgent
                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="font-medium">{guide.name}</span>
              {guide.urgent && selectedGuide !== guide.id && (
                <span className="text-xs bg-red-500 text-white px-1 rounded">URGENT</span>
              )}
            </button>
          );
        })}
      </div>

      {currentGuide && (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 font-semibold">
                {guides.find(g => g.id === selectedGuide)?.urgent 
                  ? "Time is critical! Seek immediate medical attention."
                  : "Follow these steps carefully and seek medical help when needed."
                }
              </span>
            </div>
          </div>

          {currentGuide.steps.map((step) => (
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
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                  {step.warning && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
                      <p className="text-yellow-800 text-xs font-medium flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Warning: {step.warning}
                      </p>
                    </div>
                  )}
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
              Start Emergency Video Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstAidGuide;
