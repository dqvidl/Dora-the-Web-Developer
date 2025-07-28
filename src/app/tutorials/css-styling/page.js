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

export default function CssStylingTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [xml, setXml] = useState("<xml xmlns='http://www.w3.org/1999/xhtml'></xml>");
  const [generatedHtml, setGeneratedHtml] = useState('');
  
  // Define the tutorial steps
  const tutorialSteps = [
    {
      title: "Introduction to CSS",
      description: "Learn what CSS is and how it styles web pages.",
      instructions: "Welcome to CSS Styling! CSS (Cascading Style Sheets) is used to control the appearance and layout of HTML elements.\n\nCSS allows you to:\n• Change colors, fonts, and sizes\n• Control spacing and positioning\n• Create layouts and responsive designs\n• Add visual effects and animations\n\nIn this tutorial, you'll learn CSS fundamentals using block-based coding, making it easy to understand how styles are applied to HTML elements.\n\nNo action needed for this step. Click 'Mark as Complete' to continue.",
      hints: [],
      expectedOutput: null
    },
    {
      title: "Setting Up HTML Structure",
      description: "Create a basic HTML document to style.",
      instructions: "Before we can style elements, we need some HTML to work with:\n\n1. Drag a 'baseframe' block from the HTML > Base frame category.\n2. Add a 'title' block in the head section with 'plaintext' containing 'CSS Styling Tutorial'.\n3. In the body, add an 'headline' block (h1) with 'plaintext' containing 'Welcome to CSS!'.\n4. Add a 'paragraph' block with 'plaintext' containing 'This is my first styled webpage.'.",
      hints: [
        "Start with the baseframe block for the HTML structure.",
        "The title goes in the head section, while content goes in the body.",
        "Use h1 for the main heading and p for paragraph text."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Adding Your First CSS Style",
      description: "Learn how to add CSS to change text color.",
      instructions: "Now let's add some CSS to style our heading:\n\n1. Find the 'style' block in the HTML > Base frame category.\n2. Drag it into the head section of your baseframe (after the title).\n3. Inside the style block, add a 'css rule' block from CSS > Selectors.\n4. Set the selector to 'h1' (this targets all h1 elements).\n5. Add a 'css property' block inside the rule.\n6. Set the property to 'color' and the value to 'blue'.",
      hints: [
        "The style block contains all your CSS rules.",
        "CSS rules target elements using selectors like 'h1', 'p', etc.",
        "The color property changes the text color of elements."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n<style>\nh1 {\n  color: blue;\n}\n</style>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Styling Multiple Properties",
      description: "Add multiple CSS properties to enhance your heading.",
      instructions: "Let's make our heading more attractive by adding more styles:\n\n1. In your existing h1 CSS rule, add another 'css property' block.\n2. Set this property to 'font-size' with value '36px'.\n3. Add a third 'css property' block.\n4. Set this property to 'text-align' with value 'center'.\n\nNow your heading will be blue, larger, and centered!",
      hints: [
        "You can add multiple css property blocks to the same rule.",
        "font-size controls how big the text appears.",
        "text-align can be 'left', 'center', or 'right'."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n<style>\nh1 {\n  color: blue;\n  font-size: 36px;\n  text-align: center;\n}\n</style>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Styling Paragraphs",
      description: "Apply styles to paragraph text.",
      instructions: "Now let's style the paragraph text:\n\n1. Add a new 'css rule' block after your h1 rule.\n2. Set the selector to 'p' (this targets paragraph elements).\n3. Add a 'css property' with property 'color' and value 'darkgreen'.\n4. Add another 'css property' with property 'font-size' and value '18px'.\n5. Add a third 'css property' with property 'line-height' and value '1.5'.",
      hints: [
        "Each CSS rule can target different HTML elements.",
        "line-height controls the spacing between lines of text.",
        "You can use color names like 'darkgreen' or hex codes like '#006400'."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n<style>\nh1 {\n  color: blue;\n  font-size: 36px;\n  text-align: center;\n}\np {\n  color: darkgreen;\n  font-size: 18px;\n  line-height: 1.5;\n}\n</style>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Adding Background Colors",
      description: "Learn how to add background colors to elements.",
      instructions: "Let's add some background colors to make our page more colorful:\n\n1. In your h1 CSS rule, add a 'css property' with property 'background-color' and value 'lightblue'.\n2. Add another 'css property' with property 'padding' and value '20px'.\n3. In your p CSS rule, add a 'css property' with property 'background-color' and value 'lightyellow'.\n4. Add a 'css property' with property 'padding' and value '15px'.",
      hints: [
        "background-color sets the background color behind the text.",
        "padding adds space inside the element, around the text.",
        "Try different color names like 'lightblue', 'lightyellow', 'lightgray'."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n<style>\nh1 {\n  color: blue;\n  font-size: 36px;\n  text-align: center;\n  background-color: lightblue;\n  padding: 20px;\n}\np {\n  color: darkgreen;\n  font-size: 18px;\n  line-height: 1.5;\n  background-color: lightyellow;\n  padding: 15px;\n}\n</style>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Adding Margins and Borders",
      description: "Learn about spacing and borders around elements.",
      instructions: "Let's add some spacing and borders to our elements:\n\n1. In your h1 CSS rule, add a 'css property' with property 'margin' and value '20px'.\n2. Add a 'css property' with property 'border' and value '3px solid navy'.\n3. In your p CSS rule, add a 'css property' with property 'margin' and value '20px'.\n4. Add a 'css property' with property 'border' and value '2px dashed green'.",
      hints: [
        "margin adds space outside the element, separating it from other elements.",
        "border creates a line around the element.",
        "Border syntax: width style color (e.g., '2px solid red')."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n<style>\nh1 {\n  color: blue;\n  font-size: 36px;\n  text-align: center;\n  background-color: lightblue;\n  padding: 20px;\n  margin: 20px;\n  border: 3px solid navy;\n}\np {\n  color: darkgreen;\n  font-size: 18px;\n  line-height: 1.5;\n  background-color: lightyellow;\n  padding: 15px;\n  margin: 20px;\n  border: 2px dashed green;\n}\n</style>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Styling the Body",
      description: "Apply styles to the entire page background.",
      instructions: "Let's style the entire page by targeting the body element:\n\n1. Add a new 'css rule' block with selector 'body'.\n2. Add a 'css property' with property 'background-color' and value 'lightgray'.\n3. Add a 'css property' with property 'font-family' and value 'Arial, sans-serif'.\n4. Add a 'css property' with property 'margin' and value '0'.\n5. Add a 'css property' with property 'padding' and value '20px'.",
      hints: [
        "The body selector affects the entire page.",
        "font-family changes the typeface used for text.",
        "Setting margin to 0 removes default browser spacing."
      ],
      expectedOutput: "<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n<title>CSS Styling Tutorial</title>\n<style>\nbody {\n  background-color: lightgray;\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}\nh1 {\n  color: blue;\n  font-size: 36px;\n  text-align: center;\n  background-color: lightblue;\n  padding: 20px;\n  margin: 20px;\n  border: 3px solid navy;\n}\np {\n  color: darkgreen;\n  font-size: 18px;\n  line-height: 1.5;\n  background-color: lightyellow;\n  padding: 15px;\n  margin: 20px;\n  border: 2px dashed green;\n}\n</style>\n</head>\n\n<body>\n<h1>Welcome to CSS!</h1>\n<p>This is my first styled webpage.</p>\n</body>\n</html>\n"
    },
    {
      title: "Congratulations!",
      description: "You've completed the CSS Styling tutorial!",
      instructions: "Excellent work! You've learned the fundamentals of CSS styling:\n\n✅ How to add CSS to HTML documents\n✅ Using CSS selectors to target elements\n✅ Styling text with colors and fonts\n✅ Adding backgrounds and spacing\n✅ Creating borders and layouts\n\nNext steps to continue learning:\n• Try the Advanced CSS tutorial for layouts and responsive design\n• Experiment with different colors and fonts\n• Learn about CSS classes and IDs for more specific styling\n• Explore CSS animations and transitions\n\nKeep practicing and building beautiful websites!",
      hints: [],
      expectedOutput: null
    }
  ];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('css-tutorial-progress');
    if (savedProgress) {
      const { currentStep: savedStep, completedSteps: savedCompleted } = JSON.parse(savedProgress);
      setCurrentStep(savedStep);
      setCompletedSteps(savedCompleted);
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('css-tutorial-progress', JSON.stringify({
      currentStep,
      completedSteps
    }));
  }, [currentStep, completedSteps]);

  // Mark a step as complete
  const handleCompleteStep = () => {
    if (!isStepCompleted(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step if not at the end
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
    if (stepIndex >= 0 && stepIndex < tutorialSteps.length) {
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
                <h1 className="text-3xl font-bold mb-2 text-gray-900">CSS Styling Tutorial</h1>
                <p className="text-gray-800">Learn to style HTML elements with colors, fonts, and layouts using block code.</p>
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
            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-6">
              {/* Step Navigation */}
              <div className="bg-white rounded-lg shadow-md p-4">
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
                  <li>Visit our <a href="#" className="underline">CSS reference guide</a></li>
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
