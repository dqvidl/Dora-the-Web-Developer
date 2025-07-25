'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import * as Blockly from 'blockly/core';
import { blocks } from '../../../../blockly/BlockDefinitions';
import { toolbox } from '../../../../blockly/ToolboxConfig';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlocklyWorkspace from '../../components/BlocklyWorkspace';
import CodePreview from '../../components/CodePreview';
import TutorialStep from '../../components/TutorialStep';

// Initialize Blockly blocks
Blockly.defineBlocksWithJsonArray(blocks);

// Tutorial data
const tutorials = {
  'html-basics': {
    title: 'HTML Basics',
    description: 'Learn the fundamentals of HTML structure and elements using block code.',
    level: 'Beginner',
    duration: '15 min',
    steps: [
      {
        title: "Introduction to HTML",
        description: "Learn what HTML is and how it structures web pages.",
        instructions: "In this tutorial, you'll learn the basics of HTML using block code. HTML (HyperText Markup Language) is the standard language for creating web pages.\n\nHTML uses elements to define the structure of a webpage. Each element is represented by a tag, which is enclosed in angle brackets, like <tagname>.\n\nNo action needed for this step. Click 'Mark as Complete' to continue.",
        hints: [],
        expectedOutput: null
      },
      {
        title: "Creating an HTML Document",
        description: "Set up the basic structure of an HTML document.",
        instructions: "Let's create a basic HTML document structure:\n\n1. Drag a 'baseframe' block from the HTML > Base frame category.\n2. This block creates the basic HTML structure with <html>, <head>, and <body> tags.\n\nThe baseframe is the foundation of every HTML document.",
        hints: [
          "Look for the 'baseframe' block in the HTML > Base frame category on the left toolbox.",
          "The baseframe block has slots for both head and body content."
        ],
        expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n</head>\n\n<body>\n</body>\n</html>\n"
      },
      // More steps from the HTML Basics tutorial...
    ]
  },
  'css-styling': {
    title: 'CSS Styling',
    description: 'Style your HTML elements with CSS using visual block-based coding.',
    level: 'Beginner',
    duration: '20 min',
    steps: [
      {
        title: "Introduction to CSS",
        description: "Learn what CSS is and how it styles web pages.",
        instructions: "In this tutorial, you'll learn the basics of CSS using block code. CSS (Cascading Style Sheets) is the language used to style HTML elements.\n\nCSS describes how HTML elements should be displayed on screen, paper, or other media.\n\nNo action needed for this step. Click 'Mark as Complete' to continue.",
        hints: [],
        expectedOutput: null
      },
      // More steps would be defined here...
    ]
  },
  // More tutorials would be defined here...
};

export default function TutorialPage() {
  const params = useParams();
  const tutorialId = params.id;
  
  // Check if tutorial exists
  if (!tutorials[tutorialId]) {
    notFound();
  }
  
  const tutorial = tutorials[tutorialId];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [xml, setXml] = useState("<xml xmlns='http://www.w3.org/1999/xhtml'></xml>");
  const [generatedHtml, setGeneratedHtml] = useState('');
  
  // Mark a step as complete
  const handleCompleteStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step if not on last step
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Check if a step is completed
  const isStepCompleted = (stepIndex) => {
    return completedSteps.includes(stepIndex);
  };

  // Navigate to a specific step
  const goToStep = (stepIndex) => {
    if (stepIndex <= Math.max(...completedSteps, 0) + 1) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 text-slate-800 py-8 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">{tutorial.title}</h1>
                <p className="text-gray-800">{tutorial.description}</p>
              </div>
              <div className="text-right">
                <div className="text-gray-700 text-sm">Step {currentStep + 1} of {tutorial.steps.length}</div>
                <div className="text-2xl font-bold text-gray-900">{Math.round(((currentStep + 1) / tutorial.steps.length) * 100)}% Complete</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tutorial Content */}
        <div className="container mx-auto px-2 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Steps Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-bold mb-4">Tutorial Steps</h2>
                <div className="space-y-2">
                  {tutorial.steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`w-full text-left p-2 rounded-md transition-colors ${
                        currentStep === index
                          ? 'bg-blue-100 text-blue-800'
                          : isStepCompleted(index)
                          ? 'bg-green-50 text-green-800'
                          : 'bg-gray-50 text-gray-800'
                      } ${
                        index > Math.max(...completedSteps, 0) + 1
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-100'
                      }`}
                      disabled={index > Math.max(...completedSteps, 0) + 1}
                      aria-current={currentStep === index ? 'step' : undefined}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-bold ${
                          isStepCompleted(index)
                            ? 'bg-green-500 text-white'
                            : currentStep === index
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {isStepCompleted(index) ? '✓' : index + 1}
                        </div>
                        <span className="font-medium">{step.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                <h3 className="font-bold text-yellow-800 mb-2">Need Help?</h3>
                <p className="text-yellow-800 text-sm mb-3">
                  If you're stuck, try these resources:
                </p>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>Click the "Show Hints" button in the current step</li>
                  <li>Check the expected output</li>
                  <li>Visit our <a href="/resources" className="underline">HTML reference guide</a></li>
                </ul>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:w-3/4 space-y-6">
              {/* Current Step Instructions */}
              <TutorialStep
                title={tutorial.steps[currentStep].title}
                description={tutorial.steps[currentStep].description}
                instructions={tutorial.steps[currentStep].instructions}
                hints={tutorial.steps[currentStep].hints}
                expectedOutput={tutorial.steps[currentStep].expectedOutput}
                onComplete={handleCompleteStep}
                isActive={true}
                isCompleted={isStepCompleted(currentStep)}
              />
              
              {/* Workspace and Preview */}
              <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 h-[700px]">
                {/* Blockly Workspace */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <div className="bg-gray-100 px-4 py-2 border-b">
                    <h3 className="font-medium">Block Workspace</h3>
                  </div>
                  <div className="h-[calc(100%-40px)]">
                    <BlocklyWorkspace
                      toolboxConfiguration={toolbox}
                      initialXml={xml}
                      setXml={setXml}
                      setGeneratedHtml={setGeneratedHtml}
                    />
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
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => goToStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-4 py-2 rounded ${
                    currentStep === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  aria-label="Previous step"
                >
                  Previous Step
                </button>
                
                <button
                  onClick={handleCompleteStep}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Complete step and continue"
                >
                  {isStepCompleted(currentStep) ? 'Next Step' : 'Complete & Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 