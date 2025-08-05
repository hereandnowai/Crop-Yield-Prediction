import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center py-4 px-4 md:px-8 bg-white/30 backdrop-blur-sm mt-8">
      <p className="text-sm text-gray-600">
        &copy; {currentYear} Crop Yield Prediction. All rights reserved.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Developed by Manoj [ AI Products Engineering Team ]
      </p>
    </footer>
  );
};

export default Footer;