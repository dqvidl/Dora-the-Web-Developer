import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mt-4 max-w-lg mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-8">
            <Link 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Return to Homepage
            </Link>
          </div>
          
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">You might be looking for:</h3>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/tutorials" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Tutorials
              </Link>
              <Link 
                href="/playground" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Playground
              </Link>
              <Link 
                href="/resources" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 