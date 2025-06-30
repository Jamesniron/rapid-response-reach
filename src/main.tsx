
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered successfully: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                if (confirm('New version available! Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Enhanced PWA Install Prompt
let deferredPrompt: any;
let installPromptShown = false;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install banner after a short delay if not already shown
  if (!installPromptShown) {
    setTimeout(() => {
      showInstallBanner();
    }, 3000);
  }
});

// Function to show install banner
function showInstallBanner() {
  if (installPromptShown || !deferredPrompt) return;
  
  installPromptShown = true;
  
  // Create install banner element
  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: #dc2626;
    color: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    animation: slideUp 0.3s ease-out;
  `;
  
  banner.innerHTML = `
    <div style="flex: 1; margin-right: 12px;">
      <div style="font-weight: bold; margin-bottom: 4px;">📱 Install Emergyfy</div>
      <div style="opacity: 0.9; font-size: 12px;">Get instant access to emergency services</div>
    </div>
    <div style="display: flex; gap: 8px;">
      <button id="install-btn" style="background: white; color: #dc2626; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Install</button>
      <button id="dismiss-btn" style="background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 12px; border-radius: 6px; cursor: pointer;">✕</button>
    </div>
  `;
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(banner);
  
  // Add event listeners
  document.getElementById('install-btn')?.addEventListener('click', () => {
    showInstallPrompt();
    document.body.removeChild(banner);
  });
  
  document.getElementById('dismiss-btn')?.addEventListener('click', () => {
    document.body.removeChild(banner);
  });
  
  // Auto dismiss after 10 seconds
  setTimeout(() => {
    if (document.getElementById('pwa-install-banner')) {
      document.body.removeChild(banner);
    }
  }, 10000);
}

// Enhanced install prompt function
function showInstallPrompt() {
  if (!deferredPrompt) {
    // Fallback for browsers that don't support the install prompt
    showManualInstallInstructions();
    return;
  }

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult: any) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // Track successful installation
      if ('gtag' in window) {
        (window as any).gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'accepted'
        });
      }
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
}

// Manual install instructions for unsupported browsers
function showManualInstallInstructions() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  let instructions = '';
  
  if (isIOS) {
    instructions = `
      <div style="text-align: left;">
        <strong>📱 Install on iPhone/iPad:</strong><br>
        1. Tap the Share button (□↗) below<br>
        2. Scroll down and tap "Add to Home Screen"<br>
        3. Tap "Add" to install the app
      </div>
    `;
  } else if (isAndroid) {
    instructions = `
      <div style="text-align: left;">
        <strong>📱 Install on Android:</strong><br>
        1. Tap the menu (⋮) in your browser<br>
        2. Select "Add to Home screen" or "Install app"<br>
        3. Confirm installation
      </div>
    `;
  } else {
    instructions = `
      <div style="text-align: left;">
        <strong>💻 Install on Desktop:</strong><br>
        1. Look for an install icon in your address bar<br>
        2. Or check your browser menu for "Install" option<br>
        3. Follow the prompts to install
      </div>
    `;
  }
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 20px;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 24px; border-radius: 16px; max-width: 400px; width: 100%;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 24px; margin-bottom: 8px;">🚨 Emergyfy</div>
        <div style="color: #666; font-size: 14px;">Install for faster emergency access</div>
      </div>
      ${instructions}
      <button onclick="this.parentElement.parentElement.remove()" 
              style="width: 100%; margin-top: 20px; background: #dc2626; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">
        Got it!
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Make functions available globally
(window as any).showInstallPrompt = showInstallPrompt;
(window as any).showManualInstallInstructions = showManualInstallInstructions;

// Listen for successful app installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully');
  // Hide any existing install prompts
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    document.body.removeChild(banner);
  }
});

// Check if app is already installed and hide install prompts
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('App is running in standalone mode');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
