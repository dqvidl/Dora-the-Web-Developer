import { useState } from 'react';

const TutorialStep = ({ 
  title, 
  description, 
  instructions, 
  hints = [], 
  expectedOutput = null,
  onComplete = () => {},
  isActive = false,
  isCompleted = false
}) => {
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  
  return (
    <div className={`border rounded-lg mb-4 overflow-hidden transition-all ${
      isActive ? 'border-blue-500 shadow-md' : 'border-gray-300'
    } ${isCompleted ? 'bg-green-50' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${
            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {isCompleted ? '✓' : '?'}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {isActive && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 border border-gray-200 rounded">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Instructions:</h4>
              <div className="text-sm whitespace-pre-wrap text-gray-800">{instructions}</div>
            </div>
            
            {hints.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:underline"
                  aria-expanded={showHints}
                  aria-controls="hints-panel"
                >
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </button>
                
                {showHints && (
                  <div id="hints-panel" className="bg-yellow-50 p-3 border border-yellow-200 rounded">
                    <h4 className="font-medium text-sm text-yellow-800 mb-2">
                      Hint {currentHint + 1} of {hints.length}:
                    </h4>
                    <p className="text-sm text-yellow-800">{hints[currentHint]}</p>
                    
                    {hints.length > 1 && (
                      <div className="flex justify-between mt-2">
                        <button
                          onClick={() => setCurrentHint(prev => Math.max(0, prev - 1))}
                          disabled={currentHint === 0}
                          className={`text-xs ${currentHint === 0 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}
                          aria-label="Previous hint"
                        >
                          Previous Hint
                        </button>
                        <button
                          onClick={() => setCurrentHint(prev => Math.min(hints.length - 1, prev + 1))}
                          disabled={currentHint === hints.length - 1}
                          className={`text-xs ${currentHint === hints.length - 1 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}
                          aria-label="Next hint"
                        >
                          Next Hint
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {expectedOutput && (
              <div className="bg-blue-50 p-3 border border-blue-200 rounded">
                <h4 className="font-medium text-sm text-blue-800 mb-2">Expected Output:</h4>
                <div className="text-sm text-gray-800 whitespace-pre-wrap">{expectedOutput}</div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={onComplete}
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Mark step as complete"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialStep; 