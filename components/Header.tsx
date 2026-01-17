import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onGoHome,
}) => {

  return (
    <header className="bg-white shadow-md w-full no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
             <button
              onClick={onGoHome}
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="Go to Home Screen"
              title="Go to Home Screen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-teal-600">Poultry Feed Formulation</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onNavigate(Page.SELECTION)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.SELECTION ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Ingredient Database
            </button>
            <button
              onClick={() => onNavigate(Page.INPUT)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.INPUT ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Feed Formulation
            </button>
            <button
              onClick={() => onNavigate(Page.ANALYSIS)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.ANALYSIS ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Feed Analysis
            </button>
            <button
              onClick={() => onNavigate(Page.VITAMIN_PREMIX)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.VITAMIN_PREMIX ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Vitamin Premix
            </button>
             <button
              onClick={() => onNavigate(Page.MINERAL_PREMIX)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.MINERAL_PREMIX ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Mineral Premix
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;