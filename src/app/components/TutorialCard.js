import Link from 'next/link';

const TutorialCard = ({ 
  id, 
  title, 
  description, 
  level = 'Beginner', 
  duration = '10 min',
  imageSrc = '/tutorial-placeholder.jpg'
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-40">
        <img 
          src={imageSrc} 
          alt={`${title} tutorial preview`} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x200?text=HTML+CSS+Tutorial";
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {level}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          
          <Link 
            href={`/tutorials/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Start ${title} tutorial`}
          >
            Start Tutorial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard; 