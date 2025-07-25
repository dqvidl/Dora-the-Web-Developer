'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('html');
  const [searchTerm, setSearchTerm] = useState('');
  
  // HTML Tags Reference
  const htmlTags = [
    {
      tag: '<html>',
      description: 'The root element of an HTML page',
      example: '<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>',
      category: 'Structure'
    },
    {
      tag: '<head>',
      description: 'Contains meta information about the document',
      example: '<head>\n  <title>Page Title</title>\n  <meta charset="UTF-8">\n</head>',
      category: 'Structure'
    },
    {
      tag: '<title>',
      description: 'Defines the title of the document (shown in browser tab)',
      example: '<head>\n  <title>My Website</title>\n</head>',
      category: 'Structure'
    },
    {
      tag: '<body>',
      description: 'Contains the visible page content',
      example: '<body>\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</body>',
      category: 'Structure'
    },
    {
      tag: '<h1> to <h6>',
      description: 'Defines HTML headings (h1 is largest, h6 is smallest)',
      example: '<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>',
      category: 'Text'
    },
    {
      tag: '<p>',
      description: 'Defines a paragraph',
      example: '<p>This is a paragraph.</p>',
      category: 'Text'
    },
    {
      tag: '<a>',
      description: 'Defines a hyperlink',
      example: '<a href="https://example.com">Visit Example</a>',
      category: 'Links'
    },
    {
      tag: '<img>',
      description: 'Defines an image',
      example: '<img src="image.jpg" alt="Description" width="300" height="200">',
      category: 'Media'
    },
    {
      tag: '<ul>',
      description: 'Defines an unordered list',
      example: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
      category: 'Lists'
    },
    {
      tag: '<ol>',
      description: 'Defines an ordered list',
      example: '<ol>\n  <li>First item</li>\n  <li>Second item</li>\n</ol>',
      category: 'Lists'
    },
    {
      tag: '<li>',
      description: 'Defines a list item',
      example: '<ul>\n  <li>This is a list item</li>\n</ul>',
      category: 'Lists'
    },
    {
      tag: '<div>',
      description: 'Defines a section in a document (block-level)',
      example: '<div>\n  <h2>Section Title</h2>\n  <p>Content here...</p>\n</div>',
      category: 'Layout'
    },
    {
      tag: '<span>',
      description: 'Defines a section in a document (inline)',
      example: '<p>This is <span style="color:red">red</span> text.</p>',
      category: 'Layout'
    },
    {
      tag: '<table>',
      description: 'Defines a table',
      example: '<table>\n  <tr>\n    <th>Header 1</th>\n    <th>Header 2</th>\n  </tr>\n  <tr>\n    <td>Row 1, Cell 1</td>\n    <td>Row 1, Cell 2</td>\n  </tr>\n</table>',
      category: 'Tables'
    },
    {
      tag: '<form>',
      description: 'Defines an HTML form for user input',
      example: '<form action="/submit" method="post">\n  <input type="text" name="name">\n  <input type="submit" value="Submit">\n</form>',
      category: 'Forms'
    }
  ];
  
  // CSS Properties Reference
  const cssProperties = [
    {
      property: 'color',
      description: 'Sets the color of text',
      example: 'color: blue;\ncolor: #0000FF;\ncolor: rgb(0, 0, 255);',
      category: 'Text'
    },
    {
      property: 'background-color',
      description: 'Sets the background color of an element',
      example: 'background-color: yellow;\nbackground-color: #FFFF00;\nbackground-color: rgb(255, 255, 0);',
      category: 'Background'
    },
    {
      property: 'font-family',
      description: 'Specifies the font for text',
      example: 'font-family: Arial, sans-serif;\nfont-family: "Times New Roman", Times, serif;',
      category: 'Text'
    },
    {
      property: 'font-size',
      description: 'Specifies the size of text',
      example: 'font-size: 16px;\nfont-size: 1.2em;\nfont-size: large;',
      category: 'Text'
    },
    {
      property: 'font-weight',
      description: 'Specifies the weight (boldness) of text',
      example: 'font-weight: bold;\nfont-weight: 700;',
      category: 'Text'
    },
    {
      property: 'text-align',
      description: 'Specifies the horizontal alignment of text',
      example: 'text-align: center;\ntext-align: left;\ntext-align: right;',
      category: 'Text'
    },
    {
      property: 'width',
      description: 'Sets the width of an element',
      example: 'width: 100px;\nwidth: 50%;\nwidth: auto;',
      category: 'Dimensions'
    },
    {
      property: 'height',
      description: 'Sets the height of an element',
      example: 'height: 100px;\nheight: 50%;\nheight: auto;',
      category: 'Dimensions'
    },
    {
      property: 'margin',
      description: 'Sets the margin area on all four sides of an element',
      example: 'margin: 10px;\nmargin: 10px 20px;\nmargin: 10px 20px 30px 40px;',
      category: 'Box Model'
    },
    {
      property: 'padding',
      description: 'Sets the padding area on all four sides of an element',
      example: 'padding: 10px;\npadding: 10px 20px;\npadding: 10px 20px 30px 40px;',
      category: 'Box Model'
    },
    {
      property: 'border',
      description: 'Sets the border on all four sides of an element',
      example: 'border: 1px solid black;\nborder: 2px dashed red;',
      category: 'Box Model'
    },
    {
      property: 'display',
      description: 'Specifies how an element is displayed',
      example: 'display: block;\ndisplay: inline;\ndisplay: flex;\ndisplay: none;',
      category: 'Layout'
    },
    {
      property: 'position',
      description: 'Specifies the positioning method of an element',
      example: 'position: static;\nposition: relative;\nposition: absolute;\nposition: fixed;',
      category: 'Layout'
    },
    {
      property: 'flex-direction',
      description: 'Specifies the direction of flexible items',
      example: 'flex-direction: row;\nflex-direction: column;',
      category: 'Flexbox'
    },
    {
      property: 'justify-content',
      description: 'Aligns flex items along the main axis',
      example: 'justify-content: center;\njustify-content: space-between;\njustify-content: flex-start;',
      category: 'Flexbox'
    }
  ];
  
  // Filter items based on search term
  const filteredHtmlTags = htmlTags.filter(item => 
    item.tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCssProperties = cssProperties.filter(item => 
    item.property.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 text-slate-800 py-12 border-b border-slate-100">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">HTML & CSS Resources</h1>
            <p className="text-xl mb-6 text-center max-w-2xl mx-auto text-gray-800">
              Reference guides and helpful resources for learning HTML and CSS with block code
            </p>
          </div>
        </section>
        
        {/* Resources Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <label htmlFor="search" className="sr-only">Search resources</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search HTML tags or CSS properties"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex -mb-px max-w-md mx-auto">
                <button
                  onClick={() => setActiveTab('html')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                    activeTab === 'html'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  aria-current={activeTab === 'html' ? 'page' : undefined}
                >
                  HTML Tags
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                    activeTab === 'css'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  aria-current={activeTab === 'css' ? 'page' : undefined}
                >
                  CSS Properties
                </button>
              </nav>
            </div>
            
            {/* HTML Tags Reference */}
            {activeTab === 'html' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">HTML Tags Reference</h2>
                
                {filteredHtmlTags.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHtmlTags.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                          <div className="flex justify-between items-center">
                            <h3 className="font-mono font-bold text-blue-800">{item.tag}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Example:</h4>
                            <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800">{item.example}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No HTML tags found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* CSS Properties Reference */}
            {activeTab === 'css' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">CSS Properties Reference</h2>
                
                {filteredCssProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCssProperties.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-purple-50 px-4 py-2 border-b border-purple-100">
                          <div className="flex justify-between items-center">
                            <h3 className="font-mono font-bold text-purple-800">{item.property}</h3>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Example:</h4>
                            <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800">{item.example}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No CSS properties found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Additional Resources */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Additional Learning Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2">MDN Web Docs - HTML</h3>
                  <p className="text-gray-600">
                    Comprehensive documentation and guides for HTML from Mozilla.
                  </p>
                </a>
                
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2">MDN Web Docs - CSS</h3>
                  <p className="text-gray-600">
                    Comprehensive documentation and guides for CSS from Mozilla.
                  </p>
                </a>
                
                <a
                  href="https://www.w3schools.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2">W3Schools</h3>
                  <p className="text-gray-600">
                    Tutorials, references, and examples for web development.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 