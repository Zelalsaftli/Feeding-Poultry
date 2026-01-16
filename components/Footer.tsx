import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-8 py-6 border-t no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-700">
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">Supervision & Development</h3>
        <div>
          <div className="flex justify-center items-center gap-x-4 gap-y-2">
            <p className="font-semibold text-amber-700 text-lg">Dr. Zelal Alsaftli</p>
          </div>
           <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="https://wa.me/963946656403" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 font-mono" dir="ltr">+963 946 656 403</a>
            </div>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:zelalsaftli@gmail.com" className="hover:text-teal-600 font-mono">zelalsaftli@gmail.com</a>
            </div>
        </div>
          <p className="text-sm text-gray-600 mt-2">Department of Animal Production - Faculty of Agricultural Engineering - Hama University</p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; 2026 - All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;