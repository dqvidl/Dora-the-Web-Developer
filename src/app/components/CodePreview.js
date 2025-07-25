import { useState } from 'react';

const CodePreview = ({ generatedHtml, showCode = false }) => {
  const [activeTab, setActiveTab] = useState('preview');

  // Add default CSS styling to ensure consistent appearance
  const defaultStyles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: white;
        color: black;
        margin: 8px;
        padding: 0;
        line-height: 1.4;
      }
      * {
        box-sizing: border-box;
      }
    </style>
  `;

  // Combine default styles with user's HTML
  const styledHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${defaultStyles}
</head>
<body>
  ${generatedHtml}
</body>
</html>`;

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-md overflow-hidden">
      {/* Tab navigation */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'preview'
              ? 'bg-white text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          aria-selected={activeTab === 'preview'}
          role="tab"
          aria-controls="preview-panel"
          id="preview-tab"
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'code'
              ? 'bg-white text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          aria-selected={activeTab === 'code'}
          role="tab"
          aria-controls="code-panel"
          id="code-tab"
        >
          HTML Code
        </button>
      </div>

      {/* Preview panel */}
      <div
        id="preview-panel"
        role="tabpanel"
        aria-labelledby="preview-tab"
        className={`flex-1 overflow-auto ${activeTab !== 'preview' ? 'hidden' : ''}`}
      >
        <iframe
          title="HTML Preview"
          className="w-full h-full"
          sandbox="allow-scripts"
          srcDoc={styledHtml}
          aria-label="Preview of the generated HTML code"
        />
      </div>

      {/* Code panel */}
      <div
        id="code-panel"
        role="tabpanel"
        aria-labelledby="code-tab"
        className={`flex-1 overflow-auto bg-gray-100 ${activeTab !== 'code' ? 'hidden' : ''}`}
      >
        <pre className="p-4 text-sm font-mono text-gray-800">
          <code>{generatedHtml}</code>
        </pre>
      </div>

      {/* Accessibility features */}
      <div className="bg-gray-100 p-2 border-t border-gray-300">
        <div className="flex justify-center">
          <button
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
            onClick={() => {
              // Copy code to clipboard
              navigator.clipboard.writeText(generatedHtml);
              alert('Code copied to clipboard!');
            }}
            aria-label="Copy code to clipboard"
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePreview; 