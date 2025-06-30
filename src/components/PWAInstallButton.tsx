
import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface PWAInstallButtonProps {
  className?: string;
  showText?: boolean;
  variant?: 'button' | 'banner' | 'card';
}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  className = '', 
  showText = true, 
  variant = 'button' 
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallOption, setShowInstallOption] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallOption(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallOption(false);
      toast({
        title: "App Installed Successfully!",
        description: "Emergyfy is now available on your home screen.",
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      showManualInstallInstructions();
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "Installing App...",
          description: "Emergyfy is being added to your home screen.",
        });
      }
      
      setDeferredPrompt(null);
      setShowInstallOption(false);
    } catch (error) {
      console.error('Install prompt error:', error);
      showManualInstallInstructions();
    }
  };

  const showManualInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let instructions = '';
    if (isIOS) {
      instructions = "On iOS: Tap the Share button (□↗) and select 'Add to Home Screen'";
    } else if (isAndroid) {
      instructions = "On Android: Tap the menu (⋮) and select 'Add to Home screen'";
    } else {
      instructions = "Look for an install icon in your browser's address bar";
    }

    toast({
      title: "Install Emergyfy",
      description: instructions,
      duration: 5000,
    });
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowInstallOption(false);
  };

  if (isInstalled || dismissed || !showInstallOption) {
    return null;
  }

  if (variant === 'banner') {
    return (
      <div className={`fixed bottom-4 left-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-6 h-6" />
            <div>
              <div className="font-semibold">Install Emergyfy</div>
              <div className="text-sm opacity-90">Get instant access to emergency services</div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-red-600 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-white hover:bg-red-700 p-2 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${className}`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Install Emergyfy</h3>
            <p className="text-sm text-gray-600">Quick access to emergency services</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-green-700">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Works offline for emergencies
          </div>
          <div className="flex items-center text-sm text-green-700">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Instant notifications for alerts
          </div>
          <div className="flex items-center text-sm text-green-700">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Quick access from home screen
          </div>
        </div>
        
        <button
          onClick={handleInstallClick}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Install App</span>
        </button>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={handleInstallClick}
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 ${className}`}
    >
      <Download className="w-4 h-4" />
      {showText && <span>Install App</span>}
    </button>
  );
};

export default PWAInstallButton;
