import { useRef, useEffect } from 'react';
import { useBlocklyWorkspace } from 'react-blockly';
import * as Blockly from 'blockly/core';
import { htmlGenerator } from '../../../blockly/CodeGenerators';

const BlocklyWorkspace = ({
  toolboxConfiguration,
  initialXml,
  setXml,
  setGeneratedHtml,
  onWorkspaceChange,
}) => {
  const blocklyRef = useRef(null);
  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration,
    initialXml,
    onWorkspaceChange: (workspace) => {
      const code = htmlGenerator.workspaceToCode(workspace);
      setGeneratedHtml(code);
      if (onWorkspaceChange) {
        onWorkspaceChange(workspace);
      }
    },
  });

  // Add accessibility features and modern theme to Blockly
  useEffect(() => {
    if (workspace) {
      // Detect if user prefers dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Define modern light theme
      const modernLightTheme = Blockly.Theme.defineTheme('modernLight', {
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: '#f8fafc',
          toolboxBackgroundColour: '#e2e8f0',
          toolboxForegroundColour: '#1e293b',
          flyoutBackgroundColour: '#ffffff',
          flyoutForegroundColour: '#1e293b',
          flyoutOpacity: 0.95,
          scrollbarColour: '#cbd5e1',
          insertionMarkerColour: '#3b82f6',
          insertionMarkerOpacity: 0.3,
          scrollbarOpacity: 0.6,
          cursorColour: '#3b82f6',
        },
        fontStyle: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          size: 14,
          weight: '500',
        },
      });
      
      // Define modern dark theme
      const modernDarkTheme = Blockly.Theme.defineTheme('modernDark', {
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: '#1e293b',
          toolboxBackgroundColour: '#0f172a',
          toolboxForegroundColour: '#e2e8f0',
          flyoutBackgroundColour: '#334155',
          flyoutForegroundColour: '#e2e8f0',
          flyoutOpacity: 0.95,
          scrollbarColour: '#475569',
          insertionMarkerColour: '#60a5fa',
          insertionMarkerOpacity: 0.4,
          scrollbarOpacity: 0.6,
          cursorColour: '#60a5fa',
        },
        fontStyle: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          size: 14,
          weight: '500',
        },
      });

      // Apply appropriate theme
      workspace.setTheme(prefersDark ? modernDarkTheme : modernLightTheme);
      
      // Add keyboard navigation support
      workspace.keyboardAccessibilityMode = true;
      
      // Listen for theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => {
        workspace.setTheme(e.matches ? modernDarkTheme : modernLightTheme);
      };
      mediaQuery.addListener(handleThemeChange);
      
      // Cleanup
      return () => {
        mediaQuery.removeListener(handleThemeChange);
      };
    }
  }, [workspace]);

  // Set XML when it changes
  useEffect(() => {
    if (xml) {
      setXml(xml);
    }
  }, [xml, setXml]);

  return (
    <div className="relative flex-1 w-full h-full border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-slate-800 dark:border-slate-600" ref={blocklyRef}>
      {/* Accessibility controls */}
      <div className="absolute top-3 right-3 z-10 flex space-x-2">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            if (workspace) {
              workspace.zoomCenter(1);
            }
          }}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            if (workspace) {
              workspace.zoomCenter(-1);
            }
          }}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>
        </button>
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={() => {
            if (workspace) {
              // Reset zoom to default level
              workspace.setScale(1);
              workspace.scrollCenter();
            }
          }}
          aria-label="Reset zoom"
          title="Reset zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlocklyWorkspace; 