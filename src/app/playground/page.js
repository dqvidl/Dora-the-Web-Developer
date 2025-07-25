'use client';

import { useRef, useState, useEffect } from 'react';
import * as Blockly from 'blockly/core';
import { blocks } from '../../../blockly/BlockDefinitions';
import { toolbox } from '../../../blockly/ToolboxConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlocklyWorkspace from '../components/BlocklyWorkspace';
import CodePreview from '../components/CodePreview';

// Initialize Blockly blocks
Blockly.defineBlocksWithJsonArray(blocks);

export default function Playground() {
  const fileInputRef = useRef();

  const [initialXml, setInitialXml] = useState(
    "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
  );
  const [xml, setXml] = useState(initialXml);
  const [forceRemount, setForceRemount] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const handleLoad = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = function (e) {
      setForceRemount(true);
      setXml(reader.result);
      setInitialXml(reader.result);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (forceRemount) setForceRemount(false);
  }, [forceRemount]);

  const handleSave = () => {
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blockly-workspace.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tips = [
    "Drag blocks from the toolbox on the left to the workspace.",
    "Connect blocks together to build your HTML structure.",
    "Use the 'baseframe' block to create a complete HTML document.",
    "Preview your code by clicking the 'Toggle Preview' button.",
    "Save your work using the 'Save' button to download your blocks as XML.",
    "Load previously saved work with the 'Load' button."
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Playground Header */}
        <section className="bg-white border-b p-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">HTML/CSS Block Code Playground</h1>
                <p className="text-gray-600">Build websites visually using blocks</p>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-2">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Toggle code preview"
                >
                  Toggle Preview
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Load workspace from file"
                >
                  Load
                  <input
                    type="file"
                    onChange={handleLoad}
                    ref={fileInputRef}
                    multiple={false}
                    hidden={true}
                    accept=".xml"
                  />
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Save workspace to file"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tips Section (Collapsible) */}
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4">
            <button 
              className="w-full py-2 flex justify-between items-center text-blue-800 font-medium focus:outline-none"
              onClick={() => setShowTips(!showTips)}
              aria-expanded={showTips}
              aria-controls="tips-panel"
            >
              <span>Tips for using the playground</span>
              <svg 
                className={`w-5 h-5 transform ${showTips ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showTips && (
              <div id="tips-panel" className="pb-4">
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Workspace and Preview */}
        <div className="flex-grow flex flex-col">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px]">
              {/* Blockly Workspace */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <h3 className="font-medium">Block Workspace</h3>
                </div>
                <div className="h-[calc(100%-40px)]">
                  {!forceRemount && (
                    <BlocklyWorkspace
                      toolboxConfiguration={toolbox}
                      initialXml={initialXml}
                      setXml={setXml}
                      setGeneratedHtml={setGeneratedHtml}
                    />
                  )}
                </div>
              </div>
              
              {/* Code Preview */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <h3 className="font-medium">Preview</h3>
                </div>
                <div className="h-[calc(100%-40px)]">
                  <CodePreview generatedHtml={generatedHtml} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 