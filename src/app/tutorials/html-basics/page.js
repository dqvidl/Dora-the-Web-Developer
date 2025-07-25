'use client';

import { useState, useEffect } from 'react';
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

export default function HtmlBasicsTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [xml, setXml] = useState("<xml xmlns='http://www.w3.org/1999/xhtml'></xml>");
  const [generatedHtml, setGeneratedHtml] = useState('');
  
  // Define the tutorial steps
  const tutorialSteps = [
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
    {
      title: "Adding a Page Title",
      description: "Give your webpage a title that appears in the browser tab.",
      instructions: "Now let's add a title to our webpage:\n\n1. Find the 'title' block in the HTML > Base frame category.\n2. Drag it into the head section of your baseframe.\n3. Add a 'plaintext' block inside the title block.\n4. Type 'My First Webpage' in the plaintext block.",
      hints: [
        "The title block should go in the head section of your HTML document.",
        "Use the plaintext block to add text content to your title.",
        "The title will appear in the browser tab when the page is viewed."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>My First Webpage</title>\n</head>\n\n<body>\n</body>\n</html>\n"
    },
    {
      title: "Adding a Heading",
      description: "Add a main heading to your webpage.",
      instructions: "Let's add a main heading to our webpage:\n\n1. Find the 'headline' block in the HTML > Text structure category.\n2. Drag it into the body section of your baseframe.\n3. Set the heading level to 'h1' using the dropdown.\n4. Add a 'plaintext' block inside the headline block.\n5. Type 'Welcome to My Webpage' in the plaintext block.",
      hints: [
        "The headline block creates heading elements from h1 (largest) to h6 (smallest).",
        "H1 is typically used for the main heading of a page.",
        "Place the headline block inside the body section."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>My First Webpage</title>\n</head>\n\n<body>\n<h1>Welcome to My Webpage</h1>\n</body>\n</html>\n"
    },
    {
      title: "Adding Paragraphs",
      description: "Add paragraph text to your webpage.",
      instructions: "Now let's add some paragraph text:\n\n1. Find the 'paragraph' block in the HTML > Text structure category.\n2. Drag it into the body section below your heading.\n3. Add a 'plaintext' block inside the paragraph block.\n4. Type 'This is my first webpage created with HTML block code.' in the plaintext block.\n5. Add another paragraph with different text.",
      hints: [
        "The paragraph block creates a <p> element which is used for text content.",
        "You can add multiple paragraph blocks to create separate paragraphs.",
        "Use plaintext blocks inside paragraph blocks to add your content."
      ],
      expectedOutput: null
    },
    {
      title: "Adding a Link",
      description: "Create a hyperlink to another website.",
      instructions: "Let's add a link to another website:\n\n1. Find the 'link' block in the HTML > Text structure category.\n2. Drag it into the body section below your paragraphs.\n3. In the 'href' field, type 'https://www.example.com'.\n4. Add a 'plaintext' block inside the link block.\n5. Type 'Visit Example.com' in the plaintext block.",
      hints: [
        "The link block creates an <a> element which is used for hyperlinks.",
        "The 'href' attribute specifies the URL the link goes to.",
        "The text inside the link block will be clickable."
      ],
      expectedOutput: null
    },
    {
      title: "Adding an Image",
      description: "Insert an image into your webpage.",
      instructions: "Let's add an image to our webpage:\n\n1. Find the 'image' block in the HTML > Text structure category.\n2. Drag it into the body section.\n3. In the 'src' field, type 'https://via.placeholder.com/300x200'.\n4. In the 'alt' field, type 'A placeholder image'.\n5. Set the width to '300' and height to '200'.",
      hints: [
        "The image block creates an <img> element.",
        "The 'src' attribute specifies the URL of the image.",
        "The 'alt' attribute provides alternative text for screen readers and if the image fails to load.",
        "Width and height are optional but help the browser allocate space for the image."
      ],
      expectedOutput: null
    },
    {
      title: "Congratulations!",
      description: "You've completed the HTML Basics tutorial!",
      instructions: "Congratulations! You've learned the basics of HTML structure using block code.\n\nYou now know how to:\n- Create an HTML document structure\n- Add a page title\n- Create headings\n- Add paragraphs\n- Insert links\n- Add images\n\nTry experimenting with your webpage by adding more elements or modifying the existing ones. When you're ready, you can move on to the CSS Styling tutorial to learn how to make your webpage look better!",
      hints: [],
      expectedOutput: null
    }
  ];

  // Mark a step as complete
  const handleCompleteStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step if not on last step
    if (currentStep < tutorialSteps.length - 1) {
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
                <h1 className="text-3xl font-bold mb-2 text-gray-900">HTML Basics Tutorial</h1>
                <p className="text-gray-800">Learn the fundamentals of HTML structure and elements using block code.</p>
              </div>
              <div className="text-right">
                <div className="text-gray-700 text-sm">Step {currentStep + 1} of {tutorialSteps.length}</div>
                <div className="text-2xl font-bold text-gray-900">{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}% Complete</div>
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
                  {tutorialSteps.map((step, index) => (
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
                  <li>Visit our <a href="#" className="underline">HTML reference guide</a></li>
                </ul>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:w-3/4 space-y-6">
              {/* Current Step Instructions */}
              <TutorialStep
                title={tutorialSteps[currentStep].title}
                description={tutorialSteps[currentStep].description}
                instructions={tutorialSteps[currentStep].instructions}
                hints={tutorialSteps[currentStep].hints}
                expectedOutput={tutorialSteps[currentStep].expectedOutput}
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