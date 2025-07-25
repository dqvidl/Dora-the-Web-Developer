import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-700 text-white p-4 shadow-sm border-b border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 mr-3 relative">
            <Image 
              src="/dora.png" 
              alt="Dora the Web Developer" 
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Dora The Web Developer</h1>
        </div>
        <nav aria-label="Main Navigation">
          <ul className="flex space-x-6">
            <li>
              <Link href="/tutorials" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1 transition-colors">
                Tutorials
              </Link>
            </li>
            <li>
              <Link href="/playground" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1 transition-colors">
                Playground
              </Link>
            </li>
            <li>
              <Link href="/resources" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1 transition-colors">
                Resources
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 