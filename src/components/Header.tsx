import React from 'react';
import { LeafIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="text-green-600">
                <LeafIcon className="h-8 w-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Crop Yield <span className="text-green-600">Prediction</span>
            </h1>
          </div>
           <p className="hidden md:block text-gray-500">AI-Powered Crop Yield Forecasting</p>
        </div>
      </div>
    </header>
  );
};

export default Header;