'use client';

import Link from 'next/link';
import { useHighContrast } from './HighContrastProvider';

export default function Footer() {
  const { highContrast, toggleHighContrast } = useHighContrast();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Dora The Web Developer</h2>
            <p className="text-gray-300">
              Learn HTML and CSS through interactive block-based coding.
              Build websites visually and understand the code behind them.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/tutorials" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Accessibility</h2>
            <p className="text-gray-300 mb-4">
              We're committed to making coding accessible to everyone.
            </p>
            <button 
              className={`${highContrast ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-blue-600 hover:bg-blue-700 text-white'} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label="Toggle high contrast mode"
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
            >
              {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dora The Web Developer. All rights reserved.</p>
        </div>
      </div>
      

    </footer>
  );
} 