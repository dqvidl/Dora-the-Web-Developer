'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TutorialCard from '../components/TutorialCard';

export default function Tutorials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  const tutorials = [
    {
      id: 'html-basics',
      title: 'HTML Basics',
      description: 'Learn the fundamentals of HTML structure and elements using block code.',
      level: 'Beginner',
      duration: '15 min',
      imageSrc: '/html.png'
    },
    {
      id: 'css-styling',
      title: 'CSS Styling',
      description: 'Style your HTML elements with CSS using visual block-based coding.',
      level: 'Beginner',
      duration: '20 min',
      imageSrc: '/css.png'
    }
  ];
  
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || tutorial.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 text-slate-800 py-12 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">HTML & CSS Tutorials</h1>
            <p className="text-xl mb-6 text-center max-w-2xl mx-auto text-gray-800">
              Learn web development step-by-step with Dora the Web Developer's interactive block code tutorials.
            </p>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="md:w-1/3">
                <label htmlFor="search" className="sr-only">Search tutorials</label>
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
                    placeholder="Search tutorials"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="level-filter" className="mr-2 font-medium text-gray-700">Filter by level:</label>
                <select
                  id="level-filter"
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  aria-label="Filter tutorials by level"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tutorials Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTutorials.map((tutorial) => (
                  <TutorialCard key={tutorial.id} {...tutorial} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No tutorials found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Learning Path Section */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-indigo-600 drop-shadow">Recommended Learning Path</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sky-200"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                      <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">1</div>
                    </div>
                    <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-8 max-w-md bg-white p-4 rounded-lg shadow border border-slate-100">
                      <h3 className="font-bold text-lg mb-1 text-indigo-600">Start with HTML Basics</h3>
                      <p className="text-slate-600">Learn the structure of HTML documents and essential elements.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                      <div className="bg-sky-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">2</div>
                    </div>
                    <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-8 max-w-md bg-white p-4 rounded-lg shadow border border-slate-100">
                      <h3 className="font-bold text-lg mb-1 text-sky-600">Move to CSS Styling</h3>
                      <p className="text-slate-600">Style your HTML elements with colors, fonts, and basic layouts.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                      <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">3</div>
                    </div>
                    <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-8 max-w-md bg-white p-4 rounded-lg shadow border border-slate-100">
                      <h3 className="font-bold text-lg mb-1 text-emerald-600">Explore Responsive Design</h3>
                      <p className="text-slate-600">Make your websites adapt to different screen sizes and devices.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                      <div className="bg-indigo-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">4</div>
                    </div>
                    <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-8 max-w-md bg-white p-4 rounded-lg shadow border border-slate-100">
                      <h3 className="font-bold text-lg mb-1 text-indigo-600">Build Interactive Forms</h3>
                      <p className="text-slate-600">Create forms to collect user input and understand form handling.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 