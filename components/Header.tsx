import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {

  return (
    <header className="bg-white shadow-md w-full no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
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