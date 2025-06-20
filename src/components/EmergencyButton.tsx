
import React from 'react';
import { Phone } from 'lucide-react';

interface EmergencyButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const EmergencyButton = ({ onClick, disabled = false }: EmergencyButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 
        text-white font-bold py-6 px-8 rounded-xl shadow-2xl 
        transform transition-all duration-200 
        hover:scale-105 active:scale-95
        flex items-center justify-center space-x-3
        text-xl border-4 border-red-700 hover:border-red-800
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        animate-pulse
      `}
    >
      <Phone className="w-8 h-8" />
      <span>EMERGENCY CALL</span>
    </button>
  );
};

export default EmergencyButton;
