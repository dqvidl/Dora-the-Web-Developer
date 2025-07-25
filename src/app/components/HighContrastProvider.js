'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const HighContrastContext = createContext();

export function useHighContrast() {
  const context = useContext(HighContrastContext);
  if (!context) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
}

export function HighContrastProvider({ children }) {
  const [highContrast, setHighContrast] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize high contrast mode from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('highContrastMode');
    if (savedPreference === 'true') {
      setHighContrast(true);
    }
    setIsLoaded(true);
  }, []);

  // Apply high contrast mode to body when state changes
  useEffect(() => {
    if (!isLoaded) return;

    const body = document.body;
    
    if (highContrast) {
      body.classList.add('high-contrast-mode');
      localStorage.setItem('highContrastMode', 'true');
    } else {
      body.classList.remove('high-contrast-mode');
      localStorage.setItem('highContrastMode', 'false');
    }
  }, [highContrast, isLoaded]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  return (
    <HighContrastContext.Provider value={{ highContrast, toggleHighContrast, isLoaded }}>
      {children}
      {/* Global styles for high contrast mode */}
      <style jsx global>{`
        .high-contrast-mode {
          --bg-color: black;
          --text-color: white;
          --link-color: yellow;
          --heading-color: #ffff00;
        }
        
        .high-contrast-mode .bg-gradient-to-r {
          background: var(--bg-color) !important;
        }
        
        .high-contrast-mode h1, 
        .high-contrast-mode h2, 
        .high-contrast-mode h3, 
        .high-contrast-mode h4, 
        .high-contrast-mode h5, 
        .high-contrast-mode h6 {
          color: var(--heading-color) !important;
        }
        
        .high-contrast-mode p,
        .high-contrast-mode div,
        .high-contrast-mode span {
          color: var(--text-color) !important;
        }
        
        .high-contrast-mode a {
          color: var(--link-color) !important;
        }
        
        .high-contrast-mode button {
          border: 2px solid white;
        }
        
        .high-contrast-mode .bg-white {
          background-color: black !important;
        }
        
        .high-contrast-mode .bg-gray-50,
        .high-contrast-mode .bg-gray-100 {
          background-color: #1a1a1a !important;
        }
        
        .high-contrast-mode .text-gray-600,
        .high-contrast-mode .text-gray-700,
        .high-contrast-mode .text-gray-800,
        .high-contrast-mode .text-gray-900 {
          color: white !important;
        }
      `}</style>
    </HighContrastContext.Provider>
  );
}
